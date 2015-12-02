"use strict";

var EnvironmentController = {
	elements: [],
	maxElements: 500,
	zDiff: 0.016,
	init: function() {
		for(var i = 1; i <= this.maxElements; i++) {
			var dZ = this.zDiff; // + chance.floating({ min: -0.01, max: 0.01 });
			this.addElement(
				TravelController.path.getPointAt(dZ/this.maxElements * i),
				TravelController.path.getTangentAt(dZ/this.maxElements * i),
				0
			)
		}
	},

	getElements: function() {
		return this.elements;
	},

	addElement: function(position, tangent, order) {
		//var circle = Circle.create(position, tangent);
		var even;
		if(this.elements.length % 2 == 0) {
			even = false;
		}
		else {
			even = true;
		}
		var circle = ImperfectCircle.create(position, tangent, even, order);
		this.elements.push(circle);

		if(this.elements.length > this.maxElements) {
			MainScene.scene.remove(this.elements[0]);
			this.elements.shift();
		}
	}
}
