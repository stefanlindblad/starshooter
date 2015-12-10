"use strict";

var PhoneInputController = {
  diff: 0,
  calibrateVars: {
  	direction: 0,
  	tilt: 0,
  	isCalibrated: false
  },

  infoIsHidden: false,

  init: function() {
  	this.setupSocket();
  },

  setupSocket: function() {
    var self = this;
  	var socket = io();
    var uniqueKey = Math.random().toString(36).substring(2, 7);
  	socket.emit('server connect', { key: uniqueKey });
    $("#phoneinput-info #unique-key").html(uniqueKey);
    socket.on('update movement', function(msg){
      if(!self.infoIsHidden) {
        AudioController.init();
        Rain.init();
        GUIController.init();
        self.infoIsHidden = true;
        $('#phoneinput-info').css('display', 'none');
      }
      self.deviceOrientationHandler(msg.tiltLR, msg.tiltFB, msg.dir);
      if(!self.calibrateVars.isCalibrated) {
        self.doCalibrate(msg.dir, msg.tiltFB);
        self.calibrateVars.isCalibrated = true;
      }
    });
  },

	deviceOrientationHandler: function (tiltLR, tiltFB, dir) {
    if(360 + this.diff < dir && dir < 360) {
      dir -= 360;
    }
    if(0 < dir && dir < this.diff) {
      dir += 360;
    }
    $("#tilt-LR").html(Math.round(tiltLR));
    $("#tilt-FB").html(Math.round(tiltFB));
    $("#direction").html(Math.round(dir));
    var x = (dir - this.calibrateVars.direction) * -1;
    var y = tiltFB - this.calibrateVars.tilt;
    AimController.moveAimPhone(x, y);
  },

  doCalibrate: function (dir, tiltFB) {
    this.diff = dir - 180;
    this.calibrateVars.direction = dir;
    this.calibrateVars.tilt = tiltFB;
  },

  calibrate: function() {
  	this.calibrateVars.isCalibrated = false;
  }
}