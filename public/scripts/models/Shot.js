"use strict";

var Shot = {
	geometry: new THREE.SphereGeometry( 1, 32, 32 ),
	material: new THREE.MeshBasicMaterial( {color: 0xffff00} ),
	shootObject: null,
    emitter: null,
    shootRay: null,

	init: function() {
		this.shootObject = new SPE.Group({
	    	texture: {
	            value: THREE.ImageUtils.loadTexture('textures/particle2.png')
	        },
	        maxParticleCount: 1500
	    });
        MainScene.scene.add( this.shootObject.mesh );
	},

	create: function(position) {
		if(this.emitter)
	    	this.shootObject.removeEmitter(this.emitter);

		this.shootObject.mesh.position.set(position.x, position.y, position.z);

		this.emitter = new SPE.Emitter({
	        maxAge: 5,
			position: {
	            value: new THREE.Vector3(0, 0, 0)
	        },

            acceleration: {
                value: new THREE.Vector3(0, 0, -10),
                spread: new THREE.Vector3(10, 10, 0)
            },

            velocity: {
                value: new THREE.Vector3(0, 0, 10)
            },

            color: {
                value: [ new THREE.Color( 0.5, 0.5, 0.5 ), new THREE.Color() ],
                spread: new THREE.Vector3(1, 1, 1),
            },
	        size: {
	            value: [20, 10]
	        },

			particleCount: 25
		});

		this.shootObject.addEmitter( this.emitter );
		return this.shootObject;
	},

	remove: function() {
		this.shootObject.mesh.position.z = MainScene.camera.position.z - 100;
	}
}