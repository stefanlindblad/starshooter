"use strict";

var TravelController = {
	path: null,
	speed: 0.00002,
	travelCounter: 0,
	targetCounter: 0,

	init: function() {
		this.createPath();
	},

	createPath: function(callback) {
		var pointsLength = 100;
		var pointZdiff = -200;
		var points = [];

		var prevX = 0;
		var prevY = 0;
		for(var i = 0; i < pointsLength; i++) {
			var x = prevX + chance.floating({min: -5, max: 5});
			var y = prevY + chance.floating({min: -5, max: 5});
			var z = i * pointZdiff;
			prevX = x;
			prevY = y;
			points[i] = new THREE.Vector3(x, y, z);
		}
		this.path = new THREE.SplineCurve3(points);

		EnvironmentController.init();
		TargetController.init();
	},

	moveCamera: function(callback) {
		if(this.travelCounter < 1-this.speed) {
			var self = this;
			MainScene.camera.position.copy(self.path.getPointAt(this.travelCounter));
			MainScene.mainLight.position.set(MainScene.camera.position); 
			MainScene.camera.lookAt(self.path.getPointAt(this.travelCounter+this.speed));

			this.travelCounter += this.speed;
			callback(false);
		}
		else {
			callback(true);
		}
	},

	mainLoop: function() {
		var self = this;
		this.moveCamera(function(error) {
			if(error) {
				console.log("GAME ENDED!")
				return;
			}

			TargetController.animateTargets();

			if(TargetController.targets[0].base.position.z > MainScene.camera.position.z) {
				TargetController.addTarget(
					self.path.getPointAt(self.travelCounter+TargetController.zDiff),
					self.path.getTangentAt(self.travelCounter+TargetController.zDiff)
				)
			}
			if(EnvironmentController.elements[0].position.z > MainScene.camera.position.z) {
				var dZ = EnvironmentController.zDiff; // + chance.floating({ min: -0.01, max: 0.01 });
				EnvironmentController.addElement(
					self.path.getPointAt(self.travelCounter+dZ),
					self.path.getTangentAt(self.travelCounter+dZ)
				)
			}
		});

	}
}