var f = exports
f.delegate = function(bot, from, to, message){
  switch(message[0]){
    case 'deployment':
     bot.say(to, 'Deployment on devel is verson blah blah' + message);
     bot.say(to, 'Deployment on staging is verson blah blah');
     bot.say(to, 'Deployment on production is verson blah blah');
     break;
  }
};


