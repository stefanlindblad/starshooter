"use strict";

var TravelController = {
	points: [],
	path: null,
	speed: 0.00004,
	travelCounter: 0,
	targetCounter: 0,

	init: function() {
		this.createPath();

		var self = this;
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
		console.log(this.points.length);
		this.path = new THREE.SplineCurve3(this.points);
		console.log(this.path.getLength())
		EnvironmentController.init();
		TargetController.init();
	},

	extendPath: function(callback) {
		var lastZ = this.points[this.points.length - 1].z;
		var pointsLength = 80;
		var pointZdiff = -200;
		var prevX = this.points[this.points.length - 1].x;
		var prevY = this.points[this.points.length - 1].y;
		this.points = this.points.slice(80);
		console.log(this.points.length);
		for(var i = 0; i < pointsLength; i++) {
			var x = prevX + chance.floating({min: -10, max: 10});
			var y = prevY + chance.floating({min: -10, max: 10});
			var z = i * pointZdiff + lastZ;
			prevX = x;
			prevY = y;
			this.points.push(new THREE.Vector3(x, y, z));
		}
		this.path = new THREE.SplineCurve3(this.points);
		console.log(this.points.length);
		console.log(this.path.getLength());
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
			var self = this;
			self.extendPath(function() {
				self.travelCounter = 0;
				MainScene.camera.position.copy(self.path.getPointAt(self.travelCounter));
				MainScene.mainLight.position.set(MainScene.camera.position);
				MainScene.camera.lookAt(self.path.getPointAt(self.travelCounter+self.speed));

				self.travelCounter += self.speed;
				callback(false);
			});
		}
	},

	mainLoop: function() {
		var self = this;
		this.moveCamera(function(error) {
			if(error) {
				MainScene.endGame();
				return;
			}

			TargetController.animateTargets();

			if(TargetController.targets[0].base.position.z > MainScene.camera.position.z) {
				TargetController.addTarget(
					self.path.getPointAt(self.travelCounter+TargetController.zDiff),
					self.path.getTangentAt(self.travelCounter+TargetController.zDiff),
					self.travelCounter
				)
			}
			if(EnvironmentController.elements[0].position.z > MainScene.camera.position.z) {
				var dZ = EnvironmentController.zDiff; // + chance.floating({ min: -0.01, max: 0.01 });
				EnvironmentController.addElement(
					self.path.getPointAt(self.travelCounter+dZ),
					self.path.getTangentAt(self.travelCounter+dZ),
					self.travelCounter
				)
			}
		});

	}
}
