var f = exports
f.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "bug":
      var fs = require('fs');
      var config = JSON.parse(fs.readFileSync('./config.json'));
      var query = '';
      if (message.length > 1){
        query = config.bugzilla.default_query + '&assigned_to=' + message[1] + '@suse.com';
      }
    case "bugp1":
      var https = require('https');
      var fs = require('fs');
      var config = JSON.parse(fs.readFileSync('./config.json'));
      var username = config.bugzilla.username;
      var password = config.bugzilla.password;
      var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
      if(!query){
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
            console.log(csvArray.length + 'bugs');
            //bot.say(to, csvArray.length + ' bugs in Bugzilla.');
            var i=1;
            for (i=1;i<csvArray.length;i++){
              var csvRow = csvArray[i];
              var bugPriority = csvRow[2].substring(1,2);
              if (message[0].length<4 || bugPriority === message[0][4]){
                var bugID = csvRow[0];
                var bugDesc = csvRow[7];
                var bugAssignee = csvRow[4];
                var comment = '[' + bugAssignee + ']-(P' + bugPriority  + ') ' + bugDesc + ' => https://bugzilla.novell.com/show_bug.cgi?id=' + bugID;
                bot.say(to, comment);
              }
              else if (bugPriority > message[0][4]){
                //exceeds priority
                break;
              }
            }
          } else {
            bot.say(to, res.statusCode + ' response from Bugzilla.');
          }
          bot.say(to, "End");
        });
      };
      bot.say(to, 'Checking with Bugzilla...');
      https.get(options, checkData);
      break;
   }
}
