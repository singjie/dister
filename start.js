var repl = require('repl');
// Starts the bot
var bot = require('./bot.js');
// Starts the webserver for receiving webhooks
var web = require('./web.js');

repl.start();
bot.start();
web.start();
