// Starts the bot
var bot = require('./bot.js');
// Starts the webserver for receiving webhooks
var web = require('./web.js');
var db = require('./lib/db.js');

var sj = new db.Database;
//server, nick, channel array
setTimeout(function(){
  bot.start('irc.suse.de', 'nicklsjbot', ['#leesingjie']);
  web.start();
  }, 300);

setTimeout(function(){
    sj.collection('lunch', function (err, collection) {
      collection.find(function(err, cursor) {
        cursor.toArray(function(err, docs) {
          var doc = docs[0];
          if(doc != null) {
            console.log(doc.location);
          }
        });
      });
    });
    }, 1000);
setTimeout(function(){ var abc = new db.Database;
  abc.collection('lunch', function (err, collection) {
      collection.find(function(err, cursor) { 
        cursor.toArray(function(err, docs) { 
          var doc = docs[1];
          if(doc != null) { 
            console.log(doc.location);
          } 
        });
      });
    });
}, 3000);

