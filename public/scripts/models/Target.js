"use strict";

var Target = {
	geometry: new THREE.SphereGeometry(chance.floating({min: 5, max: 7.5}), 32, 16),
	axis: new THREE.Vector3(),
	zAxis: new THREE.Vector3(0, 0, 1),

	create: function(position, tangent) {
		var baseTexture = THREE.ImageUtils.loadTexture( "scripts/models/targetTexture.jpg" );
		var baseMaterial = new THREE.MeshBasicMaterial( { map: baseTexture } );
		var glowMaterial = new THREE.ShaderMaterial({
											    uniforms: 
												{ 
													"c":   { type: "f", value: 0.0 },
													"p":   { type: "f", value: 1.0 },
													glowColor: { type: "c", value: new THREE.Color(0x0096ff) },
													viewVector: { type: "v3", value: MainScene.camera.position }
												},
												vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
												fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
												side: THREE.FrontSide,
												blending: THREE.AdditiveBlending,
												transparent: true
											});
		var baseTarget = new THREE.Mesh( this.geometry, baseMaterial );
		var glowTarget = new THREE.Mesh( this.geometry.clone(), glowMaterial );
		baseTarget.position.set(position.x, position.y, position.z);
		glowTarget.position.set(position.x, position.y, position.z);
		glowTarget.scale.multiplyScalar(1.2);
		var randomFactor = this.randomPosition(-10,10);
		baseTarget.position.add(randomFactor);
		glowTarget.position.add(randomFactor);

		tangent = tangent.normalize();
        this.axis.crossVectors(this.zAxis, tangent).normalize();
        var radians = Math.acos(this.zAxis.dot(tangent));
		baseTarget.quaternion.setFromAxisAngle(this.axis, radians );
		glowTarget.quaternion.setFromAxisAngle(this.axis, radians );

		TargetController.targets.push(baseTarget);
		TargetController.targets.push(glowTarget);

		MainScene.scene.add( baseTarget );
		MainScene.scene.add( glowTarget );
	},

	randomPosition: function(min, max) {
		var x = chance.floating({min: min, max: max});
		var y = chance.floating({min: min, max: max});
		var z = chance.floating({min: min, max: max});
		return new THREE.Vector3( x, y, z );
	}
}