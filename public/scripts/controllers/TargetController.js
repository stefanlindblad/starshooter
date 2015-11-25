"use strict";

var TargetController = {

	targets: [],
	maxTargets: 5,
	zDiff: 0.05,
	init: function() {

		for(var i = 1; i <= this.maxTargets; i++) {
			this.addTarget(
				TravelController.path.getPointAt(this.zDiff/this.maxTargets * i),
				TravelController.path.getTangentAt(this.zDiff/this.maxTargets * i)
			)
		}
	},
	getTargets: function() {
		return this.targets;
	},

	addTarget: function(position, tangent) {
		var target = Target.create(position, tangent);
		this.targets.push(target);

		if(this.targets.length > this.maxTargets) {
			MainScene.scene.remove(this.targets[0]);
			this.targets.shift();
		}
	}
}