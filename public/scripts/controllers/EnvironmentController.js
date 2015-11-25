"use strict";

var EnvironmentController = {
	elements: [],
	maxElements: 20,
	zDiff: 0.05,
	init: function() {
		for(var i = 1; i <= this.maxElements; i++) {
			this.addElement(
				TravelController.path.getPointAt(this.zDiff/this.maxElements * i),
				TravelController.path.getTangentAt(this.zDiff/this.maxElements * i)
			)
		}
	},
	getElements: function() {
		return this.elements;
	},
	addElement: function(position, tangent) {
		var circle = Circle.create(position, tangent);
		this.elements.push(circle);

		if(this.elements.length > this.maxElements) {
			MainScene.scene.remove(this.elements[0]);
			this.elements.shift();
		}
	}
}