// IRC Commands - JOIN, PART, NICK... etc.
var f = exports
f.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "join":
      bot.join(message[1]);
    break;
    case "part":
      if (message.length === 1)
        bot.part(to);
      else
        bot.part(message[1]);
    break;
    case "nick":
      bot.send('NICK', message[1]);
    break;
  }
};


