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
		var geometry = new THREE.Geometry();
		geometry.vertices = this.path.getPoints(pointsLength*50);

		var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

		var splineObject = new THREE.Line( geometry, material );

		MainScene.scene.add(splineObject);

		EnvironmentController.init();
		TargetController.init();
	},

	moveCamera: function(callback) {
		if(this.travelCounter < 1-this.speed) {
			var self = this;
			MainScene.camera.position.copy(self.path.getPointAt(this.travelCounter));
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

			if(TargetController.targets[0].position.z > MainScene.camera.position.z) {
				TargetController.addTarget(
					self.path.getPointAt(self.travelCounter+TargetController.zDiff),
					self.path.getTangentAt(self.travelCounter+TargetController.zDiff)
				)
			}
			if(EnvironmentController.elements[0].position.z > MainScene.camera.position.z) {
				EnvironmentController.addElement(
					self.path.getPointAt(self.travelCounter+EnvironmentController.zDiff),
					self.path.getTangentAt(self.travelCounter+EnvironmentController.zDiff)
				)
			}
		});

	}
}