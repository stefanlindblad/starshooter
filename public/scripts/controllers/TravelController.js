"use strict";

var TravelController = {
	path: null,
	speed: 0.00005,
	travelCounter: 0,

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

	moveCamera: function() {
		if(this.travelCounter <= 1) {
			var self = this;
			MainScene.camera.position.copy(self.path.getPointAt(this.travelCounter));
			MainScene.camera.lookAt(self.path.getPointAt(this.travelCounter+this.speed));

			this.travelCounter += this.speed;
		}
		else {
			console.log("GAME ENDED!");
		}

	}
}