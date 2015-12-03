"use strict";

var Target = {
	geometry: new THREE.SphereGeometry(chance.floating({min: 5, max: 7.5}), 32, 16),
	axis: new THREE.Vector3(),
	zAxis: new THREE.Vector3(0, 0, -1),
	rotValue: new THREE.Vector3(chance.floating({min: TargetController.animationSpeed/2, max: TargetController.animationSpeed}), 
							    chance.floating({min: TargetController.animationSpeed/2, max: TargetController.animationSpeed}), 
							    0),

	create: function(position, tangent, counter) {
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
		
		var hd = (100 * counter) / 2;
		var randomFactor = this.randomPosition(-40,40, -hd,hd, -0,0);
		baseTarget.position.add(randomFactor);
		glowTarget.position.add(randomFactor);

		tangent = tangent.normalize();
        this.axis.crossVectors(this.zAxis, tangent).normalize();
        var radians = Math.acos(this.zAxis.dot(tangent));
		baseTarget.quaternion.setFromAxisAngle(this.axis, radians );
		glowTarget.quaternion.setFromAxisAngle(this.axis, radians );

		MainScene.scene.add(baseTarget);
		MainScene.scene.add(glowTarget);
		return {
			base: baseTarget,
			glow: glowTarget
		}
	},

	randomPosition: function(minX, maxX, minY, maxY, minZ, maxZ) {
		var x = chance.floating({min: minX, max: maxX});
		var y = chance.floating({min: minY, max: maxY});
		var z = chance.floating({min: minZ, max: maxZ});
		return new THREE.Vector3( x, y, z );
	}
}