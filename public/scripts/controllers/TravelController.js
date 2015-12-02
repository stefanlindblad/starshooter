"use strict";

var TravelController = {
	points: [],
	path: null,
	speed: 0.00004,
	travelCounter: 0,
	targetCounter: 0,

	init: function() {
		this.createPath();
	},

	createPath: function() {
		var pointsLength = 100;
		var pointZdiff = -200;

		var prevX = 0;
		var prevY = 0;
		for(var i = 0; i < pointsLength; i++) {
			var x = prevX + chance.floating({min: -10, max: 10});
			var y = prevY + chance.floating({min: -10, max: 10});
			var z = i * pointZdiff;
			prevX = x;
			prevY = y;
			this.points.push(new THREE.Vector3(x, y, z));
		}
		this.path = new THREE.SplineCurve3(this.points);

		EnvironmentController.init();
		TargetController.init();
	},

	extendPath: function(callback) {
		var pointsLength = 80;
		var pointZdiff = -200;
		var prevX = 0;
		var prevY = 0;
		for(var i = 0; i < pointsLength; i++) {
			var x = prevX + chance.floating({min: -5, max: 5});
			var y = prevY + chance.floating({min: -5, max: 5});
			var z = i * pointZdiff;
			prevX = x;
			prevY = y;
			this.points.push(new THREE.Vector3(x, y, z));
		}
		console.log(this.points.length);
		this.points = this.points.slice(80, 180);
		console.log(this.points.length);
		this.path = new THREE.SplineCurve3(this.points);
		callback();
	},

	moveCamera: function(callback) {
		if(this.travelCounter < 0.8) {
			var self = this;
			MainScene.camera.position.copy(self.path.getPointAt(this.travelCounter));
			MainScene.mainLight.position.set(MainScene.camera.position);
			MainScene.camera.lookAt(self.path.getPointAt(this.travelCounter+this.speed));

			this.travelCounter += this.speed;
			callback(false);
		}
		else {
			callback(true) // game ended
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