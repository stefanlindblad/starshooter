"use strict";

var MainScene = {

	scene: null,
	camera: null,
	renderer: null,

	init: function() {
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		this.camera.position.z = 50;
		this.scene.add(this.camera);

		this.renderer = new THREE.WebGLRenderer({antialias: true});
	  	this.renderer.setSize( window.innerWidth, window.innerHeight );
	  	document.body.appendChild( this.renderer.domElement );

	  	TravelController.init();

	  	this.render();
	},

	render: function() {
		requestAnimationFrame( this.render.bind(this) );
		TWEEN.update();
		TravelController.mainLoop();
		ShootController.moveShot();
		ShootController.collisionDetection(TargetController.getTargets(), 2);
    	this.renderer.render( this.scene, this.camera );
	}
}