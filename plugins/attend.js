var db = require ('./../lib/db.js');
var dbOpen = db.Database();
exports.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "attend":
      if (message[1] && !message[2]){
        dbOpen.collection('attend-' + message[1], function (err, collection) {
            collection.find({"nick" : from}, function(err, cursor){
              cursor.count(function(err, count){
                if(!count){
                  collection.insert({"nick" : from}, function(err, docs) {
                    bot.say(to, 'Added ' + from + ' to ' + message[1] + '.');
                  });
                }
              });
            });
        });
      }
      else if (message[2] === 'list'){
        dbOpen.collection('attend-' + message[1], function (err, collection) {
          collection.find(function(err, cursor) {
            cursor.toArray(function(err, docs) {
              var i=0;
              var attendees = '';
              for(i=0;i<docs.length;i++){
                var doc = docs[i];
                if(attendees) attendees += ', ';
                attendees += doc.nick
              }
              if(attendees)
                bot.say(to, 'Attendees are: ' + attendees);
            });
          });
        });
      }
    break;
  }
};


