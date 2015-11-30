"use strict";

var Circle = {
	material: new THREE.MeshBasicMaterial( { color: 0x00EEFF, side: THREE.FrontSide, transparent: true, opacity: 0.5 } ),
	axis: new THREE.Vector3(),
	zAxis: new THREE.Vector3(0, 0, -1),

	create: function(position, tangent) {
		var completeShape = chance.bool();
		if(completeShape) {
			var geometry  = this.createCompleteShape();
		}
		else {
			var geometry = this.createSegment();
		}

		var circle = new THREE.Mesh(geometry, this.material);
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

	createCompleteShape: function() {
		var innerRadius, outerRadius, thetaSegments;
		innerRadius = chance.floating({min: 4.2, max: 5 });
		outerRadius = innerRadius + chance.floating({min: 0.06, max: 0.4 });
		var circleOrHexagon = chance.bool({likelihood: 80});
		if(circleOrHexagon) {
			thetaSegments = 30;
		}
		else {
			thetaSegments = 5;
		}
		var geometry = new THREE.RingGeometry( innerRadius, outerRadius, thetaSegments, 1 );
		return geometry;
	},

	createSegment: function() {
		var innerRadius, outerRadius, thetaStart, thetaLength;
		innerRadius = chance.floating({min: 3.6, max: 4.2 });
		outerRadius = chance.floating({min: 4.25, max: 4.85 });
		thetaStart = chance.integer({min: 1, max: 6});
		thetaLength = chance.floating({min: 1, max: 4.4});
		var geometry = new THREE.RingGeometry( innerRadius, outerRadius, 30, 1, thetaStart, thetaLength );
		return geometry;
	}
}