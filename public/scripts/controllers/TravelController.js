"use strict";

var TravelController = {
	path: null,
	travelCounter: 0,

	init: function() {
		var self = this;
		this.createPath();
	},

	createPath: function(callback) {
		var pointsLength = 100;
		var pointZdiff = -200;
		var points = [];

		var prevX = 0;
		var prevY = 0;
		for(var i = 0; i < pointsLength; i++) {
			var x = prevX + chance.floating({min: -20, max: 20});
			var y = prevY + chance.floating({min: -20, max: 20});
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

		var self = this;
		setInterval(function() { self.moveCamera() }, 100);
	},

	moveCamera: function() {
		var self = this;
		MainScene.camera.position.copy(self.path.getPointAt(this.travelCounter));
		MainScene.camera.lookAt(self.path.getPointAt(this.travelCounter+0.0005));

		this.travelCounter += 0.0005;
	}
}