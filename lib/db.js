var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

exports.Database = Database;

function Database(callback){
  client = new Db('ircdb', new Server("127.0.0.1", 27017, {}));
  client.open(callback || function(){});
  //FIXME: automatically close connection to DB
  setTimeout(function(){ client.close();console.log('closed db');}, 5000);
}
