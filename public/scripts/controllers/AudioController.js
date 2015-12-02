"use strict";

var AudioController = {
	color: false,
	audio: null,
	init: function() {
		this.audio = new Audio('audio/hotline-miami.mp3');
		this.audio.play();

		//var self = this;
		//setInterval(function() { self.makeSceneNice() }, 1000);
	},

	makeSceneNice: function() {
		this.color = !this.color;
		for(var i = 0; i < EnvironmentController.elements.length; i++) {
			var element = EnvironmentController.elements[i];
			element.material.color.setHex(ImperfectCircle.color2);
			setTimeout(function() {
				element.material.color.setHex(ImperfectCircle.color1);

			}, 100);

		}
	},

	colorPulse: function(i, elements) {
		var element = elements[i];
	}
}