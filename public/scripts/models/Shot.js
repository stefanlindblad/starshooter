"use strict";

var Shot = {
	geometry: new THREE.SphereGeometry( 1, 32, 32 ),
	material: new THREE.MeshBasicMaterial( {color: 0xffff00} ),

	create: function(position) {
		var shootObject = new THREE.Mesh( this.geometry, this.material );
		shootObject.position.set(position.x, position.y, position.z);

		return shootObject;
	}
}