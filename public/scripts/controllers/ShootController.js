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
	}
}