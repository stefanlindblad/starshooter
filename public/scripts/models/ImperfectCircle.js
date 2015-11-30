"use strict";

var ImperfectCircle = {
	material: new THREE.LineBasicMaterial( { color: 0xD490D2, linewidth: 4, opacity: 0.5, blending: THREE.AdditiveBlending, transparent: true } ),
	axis: new THREE.Vector3(),
	zAxis: new THREE.Vector3(0, 0, -1),

	create: function(position, tangent) {
		var circleGeometry = new THREE.Geometry();

		var radius = 60;
		var maxRad = radius+Math.random()*radius;;
		var minRad = 0.88*maxRad;
		var twoPi = 2*Math.PI;
		var phase = Math.random()*twoPi;

		//generate the random function that will be used to vary the radius, 9 iterations of subdivision
		var pointList = this.generatePoints(5);
		var point = pointList.first;
		var rad, theta;
		var x, y;
		/*var theta = phase;
		var rad = minRad + point.y*(maxRad - minRad);
		var x = rad*Math.cos(theta);
		var y = rad*Math.sin(theta);
		circleGeometry.vertices.push(new THREE.Vector3(x, y, 0));*/
		while (point != null) {
			theta = twoPi*point.x + phase;
			rad = minRad + point.y*(maxRad - minRad);
			x =  rad*Math.cos(theta);
			y = rad*Math.sin(theta);
			circleGeometry.vertices.push(new THREE.Vector3(x, y, 0));
			point = point.next;
		}

		var circle = new THREE.Line(circleGeometry, this.material);
		circle.position.x = position.x;
		circle.position.y = position.y;
		circle.position.z = position.z;

 		tangent = tangent.normalize();
        this.axis.crossVectors(this.zAxis, tangent).normalize();
        var radians = Math.acos(this.zAxis.dot(tangent));

		circle.quaternion.setFromAxisAngle(this.axis, radians );
		MainScene.scene.add( circle );
		return circle;
	},

	generatePoints: function (iterations) {
		var pointList = {};
		pointList.first = {x:0, y:1};
		var lastPoint = {x:1, y:1}
		var minY = 1;
		var maxY = 1;
		var point;
		var nextPoint;
		var dx, newX, newY;

		pointList.first.next = lastPoint;
		for (var i = 0; i < iterations; i++) {
			point = pointList.first;
			while (point.next != null) {
				nextPoint = point.next;

				dx = nextPoint.x - point.x;
				newX = 0.5*(point.x + nextPoint.x);
				newY = 0.5*(point.y + nextPoint.y);
				newY += dx*(Math.random()*2 - 1);

				var newPoint = {x:newX, y:newY};

				//min, max
				if (newY < minY) {
					minY = newY;
				}
				else if (newY > maxY) {
					maxY = newY;
				}

				//put between points
				newPoint.next = nextPoint;
				point.next = newPoint;

				point = nextPoint;
			}
		}

		//normalize to values between 0 and 1
		if (maxY != minY) {
			var normalizeRate = 1/(maxY - minY);
			point = pointList.first;
			while (point != null) {
				point.y = normalizeRate*(point.y - minY);
				point = point.next;
			}
		}

		return pointList;
	}
}