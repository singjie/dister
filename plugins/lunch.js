// Lunch commands with mongodb
var db = require ('./../lib/db.js');

var f = exports
f.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "lunch":
      if (message.length > 1){
        new db.Database(function(err, db){
          db.collection('lunch', function (err, collection) {
            collection.insert({"location" : message[1]}, function(err, docs) {
              bot.say(to, 'Added ' + message[1] + ' to my brain');
              console.log('location : ' + message[1]);
              client.close();
            });
          });
        });
      }
      else{
        //FIXME: opening multiple connections. crazy
        new db.Database(function(err, db){
          db.collection('lunch', function (err, collection) {
            collection.find(function(err, cursor) {
              cursor.toArray(function(err, docs) {
                var rand = (Math.random()*(docs.length-1)).toFixed(0);
                var doc = docs[rand];
                if(doc != null) {
                  console.log(doc.location);
                  bot.say(to, 'Lunch at: ' + doc.location);
                }
              });
            });
          });
        });
      }
    break;
  }
};

