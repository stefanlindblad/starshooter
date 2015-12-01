"use strict";

var ShootController = {
	shootObject: null,
	shootRay: null,
	shootSpeed: 5,
	lastCameraPos: null,
	clock: new THREE.Clock(),
	tick: 0,

	init: function() {
		var self = this;
		Shot.init();

		setInterval(function() { self.createShot() }, 2000);
	},
	createShot: function() {
		if(this.shootObject) {
			this.shootObject = null;
			Shot.remove();
		}

		this.lastCameraPos = MainScene.camera.position.z;

		this.shootObject = Shot.create(MainScene.camera.position);
		var vector = new THREE.Vector3(AimController.aim.position.x, AimController.aim.position.y, 1);
		vector.unproject(MainScene.camera);

		this.shootRay = new THREE.Ray(
			MainScene.camera.position,
			vector.sub(MainScene.camera.position).normalize()
		);
	},

	animateShot: function() {
		if(this.shootObject) {
			this.shootObject.mesh.position.x += this.shootRay.direction.x * this.shootSpeed;
			this.shootObject.mesh.position.y += this.shootRay.direction.y * this.shootSpeed;
			this.shootObject.mesh.position.z += this.shootRay.direction.z * this.shootSpeed;
			this.shootObject.mesh.position.z += MainScene.camera.position.z - this.lastCameraPos;
			this.lastCameraPos = MainScene.camera.position.z;

			this.shootObject.tick( this.clock.getDelta() );

		}
	},

	collisionDetection: function(targets, threshold) {
		if(this.shootObject) {
			for(var i = 0; i < targets.length; i++) {
				var target = targets[i];
				if( this.distance(target.base.position, this.shootObject.mesh.position) < threshold) {
					TargetController.createSparks(target);
				}
			}
		}
	},

	distance: function(v1, v2) {
    	var dx = v1.x - v2.x;
    	var dy = v1.y - v2.y;
    	var dz = v1.z - v2.z;
    	return Math.sqrt(dx*dx+dy*dy+dz*dz);
	}
}