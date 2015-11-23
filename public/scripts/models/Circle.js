"use strict";

var Circle = {
	geometry: new THREE.RingGeometry( 4, 6, 32 ),
	material: new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } ),
	axis: new THREE.Vector3(),
	zAxis: new THREE.Vector3(0, 0, 1),

	create: function(position, tangent) {
		var circle = new THREE.Mesh( this.geometry, this.material );
		circle.position.x = position.x;
		circle.position.y = position.y;
		circle.position.z = position.z;

 		tangent = tangent.normalize();
        this.axis.crossVectors(this.zAxis, tangent).normalize();
        var radians = Math.acos(this.zAxis.dot(tangent));

		circle.quaternion.setFromAxisAngle(this.axis, radians );
        console.log(circle.quaternion);
		MainScene.scene.add( circle );
	}
}