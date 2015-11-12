"use strict";

var PhoneInputController = {

  calibrateVars: {
  	direction: 0,
  	tilt: 0,
  	isCalibrated: false
  },

  init: function() {
  	this.setupSocket();
  },

  setupSocket: function() {
    var self = this;
  	var socket = io();
  	socket.emit('server connect', {});
    socket.on('server already connected', function(msg){
      socket.disconnect();
      document.getElementById('connect-error').style.display = "inline";
      document.getElementById('input-data').style.display = "none";
    })
    socket.on('update movement', function(msg){
      self.deviceOrientationHandler(msg.tiltLR, msg.tiltFB, msg.dir);
      if(!self.calibrateVars.isCalibrated) {
        self.doCalibrate(msg.dir, msg.tiltFB);
        self.calibrateVars.isCalibrated = true;
      }
    });
  },

	deviceOrientationHandler: function (tiltLR, tiltFB, dir) {
    document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
    document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
    document.getElementById("doDirection").innerHTML = Math.round(dir);
    var x = (dir - this.calibrateVars.direction) * -1;
    var y = tiltFB - this.calibrateVars.tilt;
    AimController.moveAim(new THREE.Vector3(x, y, 0));
  },

  doCalibrate: function (dir, tiltFB) {
    this.calibrateVars.direction = dir;
    this.calibrateVars.tilt = tiltFB;
  },

  calibrate: function() {
  	this.calibrateVars.isCalibrated = false;
  }
}