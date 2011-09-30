exports.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "bugs":
      var fs = require('fs');
      var config = JSON.parse(fs.readFileSync('./config.json'));
      var query = config.bugzilla.default_query;
      var priorityPhrase = '';
      var assignee;
      if (message[1]){
        switch(message[1][1]){
          //!bugs pX
          case '0':
            if(!priorityPhrase) priorityPhrase = 'Crit+Sit';
          case '1':
            if(!priorityPhrase) priorityPhrase = 'Urgent';
          case '2':
            if(!priorityPhrase) priorityPhrase = 'High';
          case '3':
            if(!priorityPhrase) priorityPhrase = 'Medium';
          case '4':
            if(!priorityPhrase) priorityPhrase = 'Low';
            query += '&priority=P' + message[1][1] + '+-+' + priorityPhrase;
          default:
            //!bugs sjlee
            if(!priorityPhrase || message[2]){
              assignee = message[1];
              if(message[2]) {
                //came from !bugs pX <additional>
                assignee = message[2];
              }
              query += '&assigned_to=' + assignee + '@suse.com';
            }
        }
      }
    case "bugp1":
      //FIXME: crap here.
      var https = require('https');
      var fs = require('fs');
      var config = JSON.parse(fs.readFileSync('./config.json'));
      var auth = 'Basic ' + config.bugzilla.user_pass_base64;
      if(!query){
        //Not coming from !bugs
        var query = config.bugzilla.default_query;
        if (message.length > 1){
          query = config.bugzilla.query;
          var i=0;
          for(i=1;i<message.length;i++){
            query += '&bug_status=' + message[i];
          }
        }
      }
      console.log(query);
      var options = {
        headers: {'Authorization': auth},
        host: config.bugzilla.host,
        path: query,
        port: 443
      };
      var checkData = function(res) {
        var data = "";
        console.log("Got response: " + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          data += chunk;
          });
        res.on('error', function(e) {
          console.log("Got error: " + e.message);
        });
        res.on('end', function(){
          if(res.statusCode === 200){
            //var json = JSON.parse(data);
            var csvToArray = require('./../lib/csv.js').CSVToArray;
            var csvArray = csvToArray(data, ',');
            var csvSize = (csvArray.length)-1; //first line is the columns
            console.log('[Bugzilla]: Found ' + csvSize + ' bugs.');
            if(!csvSize){
              //csvSize === 0
              bot.say(to, 'What!? No bugs found!');
              return;
            }
            //bot.say(to, csvArray.length + ' bugs in Bugzilla.');
            var i=1;
            var numberOfSay = 0;
            for (i=1;i<csvArray.length;i++){
              var csvRow = csvArray[i];
              var bugPriority = csvRow[2].substring(1,2);
              if (message[0].length<=4 || bugPriority === message[0][4]){
                //if !bugs || !bugp1 then print out bugs
                var bugID = csvRow[0];
                var bugDesc = csvRow[7];
                var bugAssignee = csvRow[4];
                var comment = '[' + bugAssignee + ']-(P' + bugPriority  + ') ';
                if(numberOfSay <= 5){
                  comment += bugDesc + ' => https://bugzilla.novell.com/show_bug.cgi?id=' + bugID;
                  bot.say(to, comment);
                  numberOfSay++;
                } else {
                  comment += '... and many more.';
                  bot.say(to, comment);
                  bot.say(to, 'Full listing at: https://bugzilla.novell.com' + query.replace('ctype=csv&', ''));
                  break;
                }
              }
              else if (bugPriority > message[0][4]){
                //exceeds priority
                break;
              }
            }
          } else {
            //statusCode !== 200
            bot.say(to, res.statusCode + ' response from Bugzilla.');
          }
        });
      };
      var checkingMessage = 'Checking...';
      if (priorityPhrase)
        checkingMessage += ' P' + message[1][1] + ' - ' + priorityPhrase + ' bugs.';
      if (assignee)
        checkingMessage += ' Assigned to ' + assignee + '@suse.com.'
      bot.say(to, checkingMessage);
      https.get(options, checkData);
      break;
   }
}
