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
    this.hideInputSelection();
  },

  hideInputSelection: function() {
    document.getElementById("controller-selection").style.display = "none";
  },

  showPhoneInputInfo: function() {
    document.getElementById("phoneinput-info").style.display = "table";
    MainScene.init();
    AimController.init();
    PhoneInputController.init();
  }
}