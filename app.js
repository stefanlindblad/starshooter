"use strict";

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ip = require('ip');

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

var clientId = 0;
var serverId = 0;

io.on('connection', function(socket){

  // Client
  socket.on('client connect', function(msg){
    if(clientId == 0) {
      console.log('Client connected!');
      clientId = socket.id;
    }
    else {
      io.to(socket.id).emit('client already connected', {});
    }
  });

	socket.on('update movement', function(msg){
    if(socket.id == clientId) {
      io.to(serverId).emit('update movement', msg);
    }
	});

  // Server
  socket.on('server connect', function(msg){
    if(serverId == 0) {
      console.log('Server connected!');
      serverId = socket.id;
    }
    else {
      io.to(socket.id).emit('server already connected', {});
    }
  });

  // Universal
  socket.on('disconnect', function () {
    if(socket.id == serverId) {
      serverId = 0;
      console.log("Server disconnected!")
    }
    if (socket.id == clientId) {
      clientId = 0;
      console.log("Client disconnected!")
    }
  });
});

var port = 8080;
if(process.argv.length > 2) {
  if(!isNaN(parseFloat(process.argv[2]))) {
    port = process.argv[2];
  }
}
http.listen(port, function(){
  console.log('Server is running on: ' + ip.address() + ':' + port);
  console.log('Controller is running on ' + ip.address() + ':' + port + "/control")
});
