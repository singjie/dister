var irc = exports;

irc.start = function(server, nick, channels, debug){
  var fs = require('fs'),
      path = require('path');
  var ircLib = require('irc'),
      mainChannel = '#leesingjie';

  var bot = new ircLib.Client(server, nick, {
        debug: true,
        userName: 'dister',
        realName: 'dister bot',
        channels: channels,
        });

  bot.addListener('error', function(message) {
	  console.error('ERROR: %s: %s', message.command, message.args.join(' '));
  });

  bot.addListener('message', function (from, to, message) {
  	console.log('%s => %s: %s', from, to, message);

  	if ( to.match(/^[#&]/) ) {
  		// channel message
  		if ( message.match(/hello/i) ) {
  			bot.say(to, 'Hello there ' + from);
  		}
  		if ( message.match(/dance/) ) {
  			setTimeout(function () { bot.say(to, "\u0001ACTION dances: :D\u0001") }, 1000);
  		}
      if ( message.charAt(0) === "!") {
  			//bot commands
        message = message.slice(1).split(" ");
        switch (message[0]) {
          case "time":
            bot.say(to, 'Time now is: ' + Date());
            break;
  				case "readme":
            bot.say(to, 'README.blah blah @ ---');
            break;
  				default:
            //load other plugins that matches the commands
            //FIXME: This is not ideal, require plugin at every trigger
            fs.readdir( './plugins', function( err, files ) {
              files.forEach(function(file) {
                if (path.extname(file) === '.js'){
                  var f = require( './plugins/'+file );
                  f.delegate(bot, from, to, message);
                }
              });
            });
            console.log(message[0]);
  				break;
  			}
  		}
  	}
  	else {
  		// private message
  	}
  });
  bot.addListener('pm', function(nick, message) {
  	console.log('Got private message from %s: %s', nick, message);
  });
  bot.addListener('join', function(channel, who) {
  	console.log('%s has joined %s', who, channel);
  });
  bot.addListener('part', function(channel, who, reason) {
  	console.log('%s has left %s: %s', who, channel, reason);
  });
  bot.addListener('kick', function(channel, who, by, reason) {
    console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
  });
}
