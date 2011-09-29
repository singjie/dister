var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

exports.Database = Database;
var instance;
function Database(){
  if(instance){
    return instance;
  }
  var self = this;
  self.db = {};
  var client = new Db('ircdb', new Server("127.0.0.1", 27017, {}));
  client.open(function (err, db){
    console.log('Database connection opened');
    self.db = db;
    instance = self.db;
  });
  return client;
}
