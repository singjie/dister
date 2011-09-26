var irc = require('irc');
var mainChannel = '#leesingjie';
var bot = new irc.Client('irc.freenode.net', 'nicklsjbot', {
	debug: true,
	channels: [mainChannel],
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
				case "join":
				 bot.join(message[1]);
				break;
				case "part":
				 if (to === mainChannel && message.length === 1)
				 	bot.say(to, 'Sorry, I can\'t leave this channel. Kill me if you insist.')
				  else 
					bot.part(message[1]);
				break;
				case "time":
				 bot.say(to, 'Time now is: ' + Date());
				break;
				case "readme":
				 bot.say(to, 'README.blah blah @ ---')
				 break;
				case "deployment":
				 bot.say(to, 'Deployment on devel is verson blah blah')
				 bot.say(to, 'Deployment on staging is verson blah blah')
				 bot.say(to, 'Deployment on production is verson blah blah')
				 break;
				default:
				//load other plugins that matches the commands
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

http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('hello, i know nodejitsu.');
  res.end();
}).listen(8000);
console.log('http server created');
/*
Possibilities:
- readme common facts with bot - very helpful for newcomers
	!readme hudson
	!readme git
- github integration
	<nick> commited to .... http://github.com/SUSE/blahblah
- deployment status, upon completing integration
	Release 12930219231 has been deployed on .... 
- bugzilla p1 (not sure if implementable)
	<blah blah> updated P1 bug... 
	!bnc#12321 ; http://bugzilla....url [FIXED/OPEN]
- leave matters, !avail <nick>; <nick> is currently on leave till - xxxx
- !seen <nick>; <nick> was last seen on .... 
- !remind x "Move Kiosk to all-hands area"; <nick>!!!!! - "Move Kiosk to all-hands area"
- "Conference now... xxx dial in to: xxxx with PC 85......"
- lunch! - where to? !lunch; Thai!
*/
