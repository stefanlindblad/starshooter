"use strict";

var AudioController = {
	color: false,

	init: function() {
		var audio = new Audio('audio/hotline-miami.mp3');
		audio.play();

		var self = this;
		setInterval(function() { self.makeSceneNice() }, 2000);
	},

	makeSceneNice: function() {
		this.color = !this.color;
		/*for(var i = 0; i < EnvironmentController.elements.length; i++) {
			var element = EnvironmentController.elements[i];
			if(i % 2 == 0) {
				if(this.color) {
					element.material.color.setHex(0x44FF00);
				}
				/*else {
					element.material.color.setHex(0x44FF00);
				}
			}
			else {
				if(this.color) {
					element.material.color.setHex(0xD490D2);
				}
				else {
					element.material.color.setHex(0xD490D2);
				}
			}

		}*/

	}
}