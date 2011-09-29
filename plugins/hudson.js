var f = exports
f.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "hudson":
      var db = require('./../lib/db.js');
      var dbOpen = new db.Database();
      var http = require('http');
      var fs = require('fs');
      var api = 'api/json';
      var config = JSON.parse(fs.readFileSync('./config.json')).hudson;
      var query = config.path;
      if (message[1]){
        query += message[1].charAt(0).toUpperCase() + message[1].slice(1);
      } else {
        query += 'Master';
      }
      query += '/'+api;
      var options = {
        host: config.host,
        path: query,
        port: 80
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
            var json = JSON.parse(data);
            var i=0;
            var jobStatus;
            var url;
            var comments;
            for(i=0;i<json.jobs.length;i++){
              switch (json.jobs[i].color){
                case 'blue':
                  jobStatus = 'OK';
                  break;
                case 'red':
                  jobStatus = 'FAILED';
                  url = json.jobs[i].url;
                  break;
                case 'disabled':
                  jobStatus = 'DISABLED';
                  break;
              }
              comments = '[' + jobStatus + ']: ' + json.jobs[i].name.replace('suse_studio_', '');
              if(url){
                comments += ' - ' + url;
              }
              bot.say(to, comments);
            }
          }
        });
      }
      http.get(options, checkData);
      break;
   }
}
