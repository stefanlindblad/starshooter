"use strict";

var TargetController = {

	targets: [],
	maxTargets: 5,
	zDiff: 0.06,
	animationSpeed: 0.35,
	clock: new THREE.Clock(),

	init: function() {

		for(var i = 0; i <= this.maxTargets; i++) {
			this.addTarget(
				TravelController.path.getPointAt(this.zDiff/this.maxTargets * i),
				TravelController.path.getTangentAt(this.zDiff/this.maxTargets * i),
				0
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

	addTarget: function(position, tangent, counter) {
		var newTarget = Target.create(position, tangent, counter);
		this.targets.push(newTarget);

		if(this.targets.length > this.maxTargets) {
			MainScene.scene.remove(this.targets[0].glow);
			MainScene.scene.remove(this.targets[0].base);

			this.targets.shift();
		}
	},

	animateTargets: function() {
		var length = this.targets.length;
		var delta = this.clock.getDelta();
		for(var i = 0; i < length; i++) {
			var rot = this.targets[i].rot;
			var glow = this.targets[i].glow;
			var base = this.targets[i].base;
			this.rotateObject(delta, base, glow, rot);
		}
	},

	rotateObject: function(delta, base, glow, rot) {
		if(rot < 1) {
			base.rotation.x += delta * this.animationSpeed;
			glow.rotation.x += delta * this.animationSpeed;
			return;
		}
		if(rot < 2) {
			base.rotation.y += delta * this.animationSpeed;
			glow.rotation.y += delta * this.animationSpeed;	
			return;
		}
		if(rot < 3) {
			base.rotation.z += delta * this.animationSpeed;
			glow.rotation.z += delta * this.animationSpeed;
		}
	}
}