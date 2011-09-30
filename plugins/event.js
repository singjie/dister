// Adds cron events and view cron events
var db = require ('./../lib/db.js');
var dbOpen = db.Database();
exports.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "events":
      //check existing events
      dbOpen.collection('events', function (err, collection) {
        collection.find(function(err, cursor) {
          cursor.toArray(function(err, docs) {
            var doci = 0;
            for(doci=0;doci<docs.length;doci++){
              var doc = docs[doci];
              if(doc != null) {
                bot.say(to, 'Event: ' + doc.day + ' ' + doc.hour + ' ' + doc.minute + ' ' + doc.second + ' ' + doc.repeating + ' ' + doc.to + ' ' + doc.message);
              }
            }
          });
        });
      });
      break;
    case "event":
      //add event
      var wrongSyntax = false;
      if (message[6]){
        //check syntax
        var i=0;
        for(i=0;i<6;i++){
          if(!message[i]){
            wrongSyntax = true;
          }
        }
        if(!wrongSyntax){
          dbOpen.collection('events', function (err, collection) {
            collection.insert({
              "day" : message[1],
              "hour": message[2],
              "minute": message[3],
              "second":message[4],
              "to": to,
              "message": message.slice(6).join(' '),
              "repeating": message[5]
            }, function(err, docs) {
              bot.say(to, 'Added event to my brain.');
            });
          });
        }
      }
      else {
        wrongSyntax = true;
      }
      if (wrongSyntax){
        bot.say(to, from + ', WRONG SYNTAX! !event <day> <hour> <min> <sec> <times> <message> -eg. !event * * * * 5 Hi I am dister.');
      }
    break;
  }
};


