"use strict";

var SelectInputController = {

  init: function() {

    var self = this;
  	document.getElementById("phone-control").addEventListener("click", function(e) {
      e.preventDefault()
      self.selectPhoneInput();
    });
    document.getElementById("mouse-control").addEventListener("click", function(e) {
      e.preventDefault()
      self.selectMouseInput();
    });
  },

  selectPhoneInput: function() {
    PhoneInputController.init();
    this.hideInputSelection();
  },

  selectMouseInput: function() {
    MouseInputController.init();
    this.hideInputSelection();
  },

  hideInputSelection: function() {
    document.getElementById("controller-selection").style.display = "none";
  }
}