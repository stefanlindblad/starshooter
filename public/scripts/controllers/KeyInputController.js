"use strict";

var KeyInputController = {

	init: function() {
		document.onkeyup = function(e){
	    e = window.event || e;
	    if(e.keyCode == 82) {
	      PhoneInputController.calibrate();
	    }
	  }
	}

}