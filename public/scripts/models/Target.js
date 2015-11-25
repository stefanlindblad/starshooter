"use strict";

var Target = {
	geometry: new THREE.IcosahedronGeometry( chance.floating({min: 0.5, max: 2.5}), 0 ),
	material: new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } ),
	axis: new THREE.Vector3(),
	zAxis: new THREE.Vector3(0, 0, 1),

	create: function(position, tangent) {
		var target = new THREE.Mesh( this.geometry, this.material );
		target.position.x = position.x;
		target.position.y = position.y;
		target.position.z = position.z;
		target.position.add(this.randomPosition(-6,6));

 		tangent = tangent.normalize();
        this.axis.crossVectors(this.zAxis, tangent).normalize();
        var radians = Math.acos(this.zAxis.dot(tangent));

		target.quaternion.setFromAxisAngle(this.axis, radians );
		MainScene.scene.add( target );
		return target;
	},

	randomPosition: function(min, max) {
		var x = chance.floating({min: min, max: max});
		var y = chance.floating({min: min, max: max});
		var z = chance.floating({min: min, max: max});
		return new THREE.Vector3( x, y, z );
	}
}