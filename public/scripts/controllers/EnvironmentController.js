"use strict";

var EnvironmentController = {
	elements: [],

	init: function() {
		this.createPathElements();
	},

	createPathElements: function() {
		var splineSteps = 0.005;
		var path = TravelController.path;
		var i = 0;
		while(splineSteps * i <= 1) {
			Circle.create(
				TravelController.path.getPointAt(i*splineSteps),
				TravelController.path.getTangentAt(i*splineSteps)
			);
			i++;
		}
	}
}