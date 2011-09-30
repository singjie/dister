exports.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "commands":
      var fs = require('fs');
      var file = fs.readFileSync('./README.md', 'utf8');
      var messages = file.slice(file.search("#Implemented")).split('\n');
      var i=0;
      for(i=0;i<messages.length;i++){
        //Use PRIVMSG
        if(messages[i] !== ''){
          setTimeout(function(line){
              bot.say(from, line);
          }, i*400+100, messages[i]);
        }
      }
      break;
  }
};


