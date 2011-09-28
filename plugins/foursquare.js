var f = exports
f.delegate = function(bot, from, to, message){
  switch(message[0]){
    case "food":
      var db = require('./../lib/db.js');
      var dbOpen = new db.Database();
      var https = require('https');
      var fs = require('fs');
      var config = JSON.parse(fs.readFileSync('./config.json')).foursquare;
      var query = config.path;
      query += '&client_id=' + config.client_id + '&client_secret=' + config.client_secret + '&ll=' + config.location
      var options = {
        host: config.host,
        path: query,
        port: 443
      };
      var checkData = function(res) {
        var data = "";
        console.log("Got response: " + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          data += chunk;
          });
        res.on('error', function(e) {
          console.log("Got error: " + e.message);
        });
        res.on('end', function(){
          if(res.statusCode === 200){
            var json = JSON.parse(data);
            var items = json.response.groups[0].items;
            var size = json.response.groups[0].items.length;
            do {
              var rand = (Math.random()*(size-1)).toFixed(0);
              var theOne = items[rand];
              //Same place again, please randomize again.
            } while(lastWent === theOne.venue.name);

            bot.say(to, 'Time for ' + theOne.venue.name + '!');
            bot.say(to, 'Map: ' + 'http://maps.google.com/maps?saddr=' + config.location + '&daddr=' + theOne.venue.location.lat + ',' + theOne.venue.location.lng + '&hl=en&dirflg=w');
            dbOpen.collection('food', function(err, collection){
              if(lastWent){
                collection.remove({"name": lastWent});
                console.log('removing ' + lastWent);
              }
              collection.insert({"name": theOne.venue.name, "recommended_at": (new Date).getTime()});
            });
          } else {
            bot.say(to, res.statusCode + ' response from Foursquare.');
          }
        });
      };
      var lastWent;
      var angry=false;
      //Check db for last suggestion, before initializing request to 4square
      dbOpen.collection('food', function(err, collection){
        collection.find(function(err, cursor){
          cursor.toArray(function(err, docs){
            if(docs[0]){
              //old record found.
              lastWent = docs[0].name;
              if((new Date).getTime() - docs[0].recommended_at < 1000*60*60*12){
                angry = true;
              }
            }
            //check if angry, if angry, don't bother searching again
            if (angry){
              bot.say(to, from + ', I have already recommended ' + docs[0].name + ' today!#!@#!#@!');
            } else {
              var comments = 'Foooooooood...';
              if (lastWent){
                comments += ' Not ' +  lastWent + ' again right?';
              }

              bot.say(to, comments);
              https.get(options, checkData);
            }
          });
        });
      });
      break;
   }
}
