// Starts the bot
var bot = require('./bot.js');
// Starts the webserver for receiving webhooks
var web = require('./web.js');
var db = require('./lib/db.js');

var sj = new db.Database;
//server, nick, channel array
setTimeout(function(){
  bot.start();
  web.start();
  }, 300);
