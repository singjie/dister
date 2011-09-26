var repl = require('repl');
// Starts the bot
var bot = require('./bot.js');
// Starts the webserver for receiving webhooks
var web = require('./web.js');

repl.start();
//server, nick, channel array
bot.start('irc.suse.de', 'nicklsjbot', ['#leesingjie']);
web.start();
