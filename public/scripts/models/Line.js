"use strict";

var Line = {
	create: function() {
		var material = new THREE.LineBasicMaterial({
			color: 0x05B8FF
		});

		var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( -10, 0, 0 ),
			new THREE.Vector3( 0, 10, 0 ),
			new THREE.Vector3( 10, 0, 0 )
		);

		var line = new THREE.Line( geometry, material );
		MainScene.scene.add( line );
	}
}