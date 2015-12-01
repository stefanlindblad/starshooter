"use strict";

var TargetController = {

	targets: [],
	maxTargets: 10,
	zDiff: 0.05,

	init: function() {

		for(var i = 0; i <= this.maxTargets; i++) {
			this.addTarget(
				TravelController.path.getPointAt(this.zDiff/this.maxTargets * i),
				TravelController.path.getTangentAt(this.zDiff/this.maxTargets * i)
			)
		};
	},

	getTargets: function() {
		return this.targets;
	},

	createSparks: function(target) {
		var pMaterial = new THREE.PointsMaterial({color: 0xFF0000, size: 20});
		var points = new THREE.Points(target.geometry, pMaterial);
		MainScene.scene.add(points);
		target.visible = false;
	},

	addTarget: function(position, tangent) {
		Target.create(position, tangent);

		if(this.targets.length > this.maxTargets) {
			MainScene.scene.remove(this.targets[0]);
			MainScene.scene.remove(this.targets[1]);
			this.targets.shift();
			this.targets.shift();

		}
	}
}