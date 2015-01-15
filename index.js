var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

/*==================================
=            Web server            =
==================================*/
// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true})); 
// Serve static assets from /public
app.use(express.static(__dirname + '/public'));
// Look for templates in /views
app.set('views', __dirname + '/views');
// Use EJS as template engine
app.engine('html', require('ejs').renderFile);

var server = http.createServer(app)

/*=====================================
=            Socket server            =
=====================================*/
var wss = new WebSocketServer({server: server});
console.log('websocket server created')

wss.on('connection', function(ws) {
  console.log('websocket connection open');

  ws.on('close', function() {
    console.log('websocket connection close');
  });
});

wss.broadcast = function broadcast(data) {
  data = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

/*=====================================
=            Web addresses            =
=====================================*/
app.get('/controller', function(req, res) {
  res.render('controller.html');
});

app.get('/projector', function(req, res) {
  res.render('projector.html');
});

app.post('/events', function(req, res) {
  var event = req.body;
  wss.broadcast(event);

  res.send({status: 'sent'});
});

/*===============================
=            Startup            =
===============================*/
server.listen(port)
console.log('http server listening on %d', port)
