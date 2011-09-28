exports.Timer = Timer;

function Timer(bot){
  var db = require ('./lib/db.js');
  var dbOpen = new db.Database();
  var timerEvent = function(){
    var now = new Date();
    dbOpen.collection('events', function (err, collection) {
      collection.find({
        "$and" : [
          {"$or" : [{"day": now.getDay()}, {"day" : "*"}]},
          {"$or" : [{"hour": now.getHours()}, {"hour" : "*"}]},
          {"$or" : [{"minute": now.getMinutes()}, {"minute" : "*"}]},
          {"$or" : [{"second": now.getSeconds()}, {"second" : "*"}]}
          ]
        },
        function(err, cursor) {
          cursor.toArray(function(err, docs) {
            var i=0;
            for(i=0;i<docs.length;i++){
              var doc = docs[i];
              if(doc != null){
                console.log(doc.to + ':' + doc.message);
                bot.say(doc.to, doc.message);
                if(doc.repeating > 1){
                  collection.update({"_id": doc._id}, {"$set": {"repeating": doc.repeating-1}});
                } else if (doc.repeating === 1){
                  collection.remove({"_id": doc._id});
                }
              }
            }
          });
        });
    });

    setTimeout(timerEvent, 1000);
  };
  setTimeout(timerEvent, 1000);
}
