http = require('http');

var web = exports;

web.start = function(){
  http.createServer(function (req, res) {
    if (req.method == 'POST') {
      var fullBody = '';
      req.on('data', function(chunk) {
      fullBody += chunk.toString();
      });
      req.on('end', function() {
        //write into a file, which the bot polls, or generate an event for the bot
        console.log(fullBody);
      });
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello, dister');
    res.end();
  }).listen(8000);
  console.log('http server created');
}

