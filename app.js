"use strict";

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ip = require('ip');
var _ = require('underscore');

app.use("/scripts", express.static(__dirname + "/public/scripts"));
app.use("/styles", express.static(__dirname + "/public/styles"));
app.use("/images", express.static(__dirname + "/public/images"));
app.use("/views", express.static(__dirname + "/public/views"));
app.use("/textures", express.static(__dirname + "/public/textures"));
app.use("/audio", express.static(__dirname + "/public/audio"));
app.use("/bower_components", express.static(__dirname + "/bower_components"))

app.get('/', function(req, res){
	res.sendFile("server.html", { root: __dirname + "/public/views" });
});

app.get('/control', function(req, res){
	res.sendFile("controller.html", { root: __dirname + "/public/views" });
});

app.get('/about', function(req, res){
	res.sendFile("about.html", { root: __dirname + "/public/views" });
});

var port = 8080;
if(process.argv.length > 2) {
  if(!isNaN(parseFloat(process.argv[2]))) {
    port = process.argv[2];
  }
}

// Socketio
var serverClientPairs = [];

io.on('connection', function(socket){

  // Client
  socket.on('client connect', function(msg){
    var pair = _.find(serverClientPairs, function(pair) {
      return pair.key == msg.key;
    })
    if(pair.client == null)
      pair.client = socket.id;

  });

	socket.on('update movement', function(msg){
    var pair = _.find(serverClientPairs, function(pair) {
      return pair.client == socket.id;
    });
    if(pair)
      io.to(pair.server).emit('update movement', msg);
	});

  // Server
  socket.on('server connect', function(msg){
    serverClientPairs.push({
      server: socket.id,
      client: null,
      key: msg.key
    });
  });

  // Universal
  socket.on('disconnect', function () {
    var isServer = _.find(serverClientPairs, function(pair) {
      return pair.server == socket.id;
    });
    if(isServer) {
      serverClientPairs = _.reject(serverClientPairs, function(pair) {
        return pair.server == socket.id;
      })
      return;
    }

    var pair = _.find(serverClientPairs, function(pair) {
      return pair.client == socket.id;
    })
    if(pair)
      pair.client = null;
  });
});

// Start listening
server.listen(port, function(){
  console.log('Server is running on: ' + ip.address() + ':' + port);
  console.log('Controller is running on ' + ip.address() + ':' + port + "/control")
});
