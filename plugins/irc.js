// IRC Commands - JOIN, PART, NICK... etc.
var f = exports
f.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "join":
      var channel = '';
      if(message[1][0] === '#'){
        channel = message[1];
      } else {
        channel = '#'+message[1];
      }
      bot.join(channel);
      break;
    case "part":
      if (message.length === 1)
        bot.part(to);
      else{
        var channel = '';
        if(message[1][0] === '#'){
          channel = message[1];
        } else {
          channel = '#'+message[1];
        }
        bot.part(channel);
      }
      break;
    case "nick":
      bot.send('NICK', message[1]);
      break;
    case "say":
      bot.say(message[1], message[2]);
      break;
  }
};


