"use strict";

var AudioController = {
	color: false,
	audio: null,
	init: function() {
		this.audio = new Audio('audio/hotline-miami.mp3');
		this.audio.play();

		var self = this;
		setTimeout(function() {
			setInterval(function() { self.makeSceneNice() }, 1260);
		}, 800);

	},

	makeSceneNice: function() {
	  this.color = !this.color;
		var order = Math.floor((Math.random() * 360) + 1);
		ImperfectCircle.color1 = 'hsl(' + order/360 + ", " + '100%, 62%)';
	  for(var i = 80; i < EnvironmentController.elements.length; i++) {
	  	var element = EnvironmentController.elements[i];
    	element.material.color.setHSL(order/360, 1, 0.62);
		}
	},

	colorPulse: function(i, elements) {
		var element = elements[i];
	}
}
