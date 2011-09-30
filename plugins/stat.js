exports.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "stats":
      var fs = require('fs');
      var config = JSON.parse(fs.readFileSync('./config.json')).topinfo;
      var exec  = require('child_process').exec,
          child;
      if(!message[1] || message[1].slice(0,4) !== 'node'){
        bot.say(to, 'Sorry, only nodeXX allowed');
        break;
      }
      child = exec('ssh ' + config.host + ' ssh ' + message[1] + ' "top -b -n 1 | head -n 5"',
      function (error, stdout, stderr) {
        var messages = stdout.split('\n');
        var i=0;
        if (error !== null) {
          bot.say(to, 'exec error: ' + error);
        }
        for(i=0;i<messages.length-1;i++){
          bot.say(to, '[' + message[1] + ']: ' + messages[i]);
        }
        child.kill();
      });
    break;
  }
};


