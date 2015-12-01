"use strict";

var KeyInputController = {

	init: function() {
		$(document).keyup(function(e){
		    e = window.event || e;
		    if(e.keyCode == 82) {
		      PhoneInputController.calibrate();
		    }
	  	});
	}

}