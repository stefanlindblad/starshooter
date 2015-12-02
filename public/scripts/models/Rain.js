"use strict";

var Rain = {
	particleSystem : null,
	particlesCount : 30000,
	// Horizontal viewing angle
	alpha : Math.PI/4.0,
	// Vertical viewing angle
	beta : Math.PI/4.0,
	// Nearly horizontal distance
	dnear : null,
	// Far plane distance
	dfar : null,
	// Windows height
	height : window.innerHeight,
	// Windows width
	width : window.innerWidth,
	// Camera position
	positionCamera : null,
	// Camera angle
	angleCamera : null,
	// Particle initial height
	hp : 200,

	init: function() {

		this.dnear = MainScene.camera.near;
		this.dfar = MainScene.camera.far;
		this.positionCamera = MainScene.camera.position;
		this.angleCamera = MainScene.camera.fov * Math.PI/180.0;

		var geometry = new THREE.BufferGeometry();

		var positions = new Float32Array( this.particlesCount * 3 );
		var colors = new Float32Array( this.particlesCount * 3 );

		var color = new THREE.Color();

		var n = 1000;

		for ( var i = 0; i < positions.length; i += 3 ) {

			// positions

			var dmax = this.height * this.hp / (2.0 * Math.tan(this.beta/2));
			var radius = this.dnear + (dmax - this.dnear) * Math.random();
			var phi = (Math.PI - this.beta)/2.0 + Math.random() * this.beta/2.0;
			var theta = this.angleCamera - Math.PI - this.alpha/2.0 + this.alpha * Math.random();

			var x = this.positionCamera.x + radius * Math.sin(phi) * Math.sin(theta) + 1000;
			var y = this.positionCamera.y + radius * Math.cos(phi);
			var z = this.positionCamera.z + radius * Math.sin(phi) * Math.cos(theta);

			positions[i] = x;
			positions[i+1] = y;
			positions[i+2] = z;

			// colors

			var vx = Math.random();
			var vy = Math.random();
			var vz = Math.random();

			color.setRGB( vx, vy, vz );

			colors[ i ]     = color.r;
			colors[ i + 1 ] = color.g;
			colors[ i + 2 ] = color.b;

		}

		geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

		geometry.computeBoundingSphere();

		var material = new THREE.PointsMaterial( { size: 15, vertexColors: THREE.VertexColors } );

		this.particleSystem = new THREE.Points( geometry, material );
		MainScene.scene.add( this.particleSystem );

	},

	renderRain : function() {

		if (this.particleSystem == null) {
			return;
		}

		// Initial speed
		var initialSpeed = 100.0;
		// Direction of wind
		var heta = -Math.PI/6.0;
		// Y direction initial speed
		var speedY = -10.0;
		// Delta time
		var deltaTime = 0.001;
		// Gravity
		var gravity = 9.8 / (deltaTime * deltaTime);


		var positions = this.particleSystem.geometry.attributes.position.array;
		var colors = this.particleSystem.geometry.attributes.color.array;
		var color = new THREE.Color();

		var n = 1000;

		for (var i = 0; i < positions.length; i += 3) {
			if (positions[i+1] < -this.hp) {
				var dmax = this.height * this.hp / (2.0 * Math.tan(this.beta/2));
				var radius = this.dnear + (dmax - this.dnear) * Math.random();
				var phi = (Math.PI - this.beta)/2.0 + Math.random() * this.beta/2.0;
				var theta = this.angleCamera - Math.PI - this.alpha/2.0 + this.alpha * Math.random();			

				var x = this.positionCamera.x + radius * Math.sin(phi) * Math.sin(theta) + 1000;
				var y = this.positionCamera.y + radius * Math.cos(phi);
				var z = this.positionCamera.z + radius * Math.sin(phi) * Math.cos(theta);

				positions[i] = x;
				positions[i+1] = y;
				positions[i+2] = z;

				var vx = Math.random();
				var vy = Math.random();
				var vz = Math.random();

				color.setRGB( vx, vy, vz );

				colors[ i ]     = color.r;
				colors[ i + 1 ] = color.g;
				colors[ i + 2 ] = color.b;
			} else {
				var vx0 = initialSpeed * Math.cos(heta);
				var vy0 = -10.0;
				var vz0 = initialSpeed * Math.sin(heta);

				positions[i] += vx0 * deltaTime;
				positions[i+1] += vy0 * deltaTime - gravity * deltaTime * deltaTime / 2.0;
				positions[i+2] += vz0 * deltaTime;
			}
		}


		this.particleSystem.geometry.attributes.position.needsUpdate = true;

	}
}