"use strict";

var TargetController = {

	targets: [],
	maxTargets: 5,
	zDiff: 0.05,
	animationSpeed: 10,
	clock: new THREE.Clock(),

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
		target.base.visible = false;
		target.glow.visible = false;
	},

	addTarget: function(position, tangent) {
		var newTarget = Target.create(position, tangent);
		this.targets.push(newTarget);

		if(this.targets.length > this.maxTargets) {
			MainScene.scene.remove(this.targets[0]);
			this.targets.shift();

		}
	},

	animateTargets: function() {
		for(var i = 0; i < this.targets.length; i++) {
			//if(i<this.targets.length-1)
			//	console.log(this.targets[i] === this.targets[i+1]);
			var glow = this.targets[i].glow;
			var base = this.targets[i].base;
			var delta = this.clock.getDelta();
			this.rotateObject(delta, base, glow);
		}
	},

	rotateObject: function(delta, base, glow) {
		//base.rotation.x += delta * this.rotValue.x;
		base.rotation.y += delta * this.animationSpeed;
		//glow.rotation.x += delta * this.rotValue.x;
		glow.rotation.y += delta * this.animationSpeed;
	}
}