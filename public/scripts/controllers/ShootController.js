"use strict";

var ShootController = {
	shootObject: null,
	shootRay: null,
	shootSpeed: 1,
	lastCameraPos: null,

	init: function() {
		var self = this;
		setInterval(function() { self.createShot() }, 2000);
	},
	createShot: function() {
		if(this.shootObject)
			MainScene.scene.remove(this.shootObject);

		this.lastCameraPos = MainScene.camera.position.z;

		this.shootObject = Shot.create(MainScene.camera.position);

		var vector = new THREE.Vector3(AimController.aim.position.x, AimController.aim.position.y, 1);
		vector.unproject(MainScene.camera);

		this.shootRay = new THREE.Ray(
				MainScene.camera.position,
				vector.sub(MainScene.camera.position).normalize()
		);
		MainScene.scene.add( this.shootObject );
	},

	moveShot: function() {
		if(this.shootObject) {
			this.shootObject.translateX(this.shootRay.direction.x * this.shootSpeed);
			this.shootObject.translateY(this.shootRay.direction.y * this.shootSpeed);
			this.shootObject.translateZ(this.shootRay.direction.z * this.shootSpeed);
			this.shootObject.position.z += MainScene.camera.position.z - this.lastCameraPos;
			this.lastCameraPos = MainScene.camera.position.z;
		}
	},

	collisionDetection: function(targets, threshold) {
		if(this.shootObject) {
			for(var i = 0; i < targets.length; i++) {
				var target = targets[i];
				if( this.distance(target.position, this.shootObject.position) < threshold)
					MainScene.scene.remove(target);
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