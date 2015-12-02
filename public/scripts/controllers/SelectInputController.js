"use strict";

var SelectInputController = {

  init: function() {

    var self = this;
  	$("#phone-control").click(function(e) {
      e.preventDefault()
      self.selectPhoneInput();
    });
    $("#mouse-control").click(function(e) {
      e.preventDefault()
      self.selectMouseInput();
    });
  },

  selectPhoneInput: function() {
    this.hideInputSelection();
    this.showPhoneInputInfo();
  },

  selectMouseInput: function() {
    MainScene.init();
    AimController.init();
    MouseInputController.init();
    AudioController.init();
    Rain.init();
    this.hideInputSelection();
  },

  hideInputSelection: function() {
    document.getElementById("controller-selection").style.display = "none";
  },

  showPhoneInputInfo: function() {
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
    var pc = new RTCPeerConnection({iceServers:[]});
    var noop = function(){};
    pc.createDataChannel("");    //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
    pc.onicecandidate = function(ice){  //listen for candidate events
      if(!ice || !ice.candidate || !ice.candidate.candidate)
        return;
      var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
      document.getElementById("ip").innerHTML = myIP;
      pc.onicecandidate = noop;
    };
    setTimeout(function() {
      document.getElementById("phoneinput-info").style.display = "table";
    }, 100);
    MainScene.init();
    AimController.init();
    PhoneInputController.init();
    AudioController.init();

  }
}