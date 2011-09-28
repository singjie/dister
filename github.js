exports.Github = Github;

function Github(bot, to){
  var http = require('http');
  var fs = require('fs');
  var config = JSON.parse(fs.readFileSync('./config.json'));
  var username = config.github.username;
  var token = config.github.token;
  var auth = 'Basic ' + new Buffer(username + '/token:' + token).toString('base64');
  var options = {
    headers: {'Authorization': auth},
    host: 'github.com',
    path: config.github.url,
    port: 80
  };
  var Db = require('mongodb').Db,
      Connection = require('mongodb').Connection,
      Server = require('mongodb').Server;

  var commitsInDatabase={};
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
      var json = JSON.parse(data);
      console.log(json.commits.length);
      client = new Db('testdata', new Server("127.0.0.1", 27017, {}));

      //finish receiving
      //check if db array is empty
        //if not empty, compare.
      //query db with findOne()
      //compare latest from db with latest from findOne()
      //if findOne() not same with db
        //use findOne() doc to look from latest
          //strip remaining, and add to db
          //and broadcast
      client.open(function(err, db){
        db.collection('res', function(err, collection){
          collection.find({}, {'limit':1, 'sort': [['committed_date', 'desc']]}).toArray(function(err, docs){
              if(docs.length == 0){
                collection.insert(json.commits, function(err, docs){
                  console.log('DB initialized');
                  client.close();
                });
              }
              else if(docs[0].id !== json.commits[0].id){
                console.log('New commits found.');
                var i=0;
                for(i=0;i<json.commits.length;i++){
                  //iterate through latest commit
                  if(docs[0].id === json.commits[i].id){
                    //found commit that stopped at. i-1 will have the latest commit
                    json.commits.splice(i, json.commits.length-i);
                    console.log(json.commits);
                    collection.insert(json.commits, function(err, docs){
                      client.close();
                      console.log("Inserted new commit into DB");
                    });
                    break;
                  }
                  var subMessage = json.commits[i].message;
                  if(subMessage.length > 50){
                    subMessage = subMessage.substring(0,49);
                  }

                  bot.say(to, '[Commit: ' + json.commits[i].id.substring(0,6) + ' By: ' + json.commits[i].committer.name + ']: ' + subMessage);
                }
              }
              else {
                client.close();
              }
              setTimeout(getHTTP, 5000);
          });
        });
      });
    })
  }
  var getHTTP = function(){
    http.get(options, checkData);
  }

  getHTTP();
}
