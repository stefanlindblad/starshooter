"use strict";

var TargetRenderController = {
	elements: [],

	init: function() {
		this.createPathTargets();
	},

	createPathTargets: function() {
		var splineSteps = 0.005;
		var path = TravelController.path;
		var i = 0;
		while(splineSteps * i <= 1) {
			Target.create(
				TravelController.path.getPointAt(i*splineSteps),
				TravelController.path.getTangentAt(i*splineSteps)
			);
			i++;
		}
	}
}