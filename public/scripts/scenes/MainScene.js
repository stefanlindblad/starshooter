"use strict";

var MainScene = {

	scene: null,
	camera: null,
	mainLight: null,
	renderer: null,

	init: function() {
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		this.camera.position.z = 50;
		this.scene.add(this.camera);
		this.mainLight = new THREE.PointLight(0xffffff);
		this.mainLight.position.set(this.camera.position);
		this.scene.add(this.mainLight);

		this.renderer = new THREE.WebGLRenderer({antialias: true});
	  	this.renderer.setSize( window.innerWidth, window.innerHeight );
	  	document.body.appendChild( this.renderer.domElement );

	  	TravelController.init();

	  	window.addEventListener( 'resize', function() {
            var w = window.innerWidth,
                h = window.innerHeight;

            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize( w, h );
        }, false );

	  	this.render();
	},

	render: function() {
		requestAnimationFrame( this.render.bind(this) );
		TWEEN.update();
		TravelController.mainLoop();
		ShootController.animateShot();
		ShootController.collisionDetection(TargetController.getTargets(), 8);
    	this.renderer.render( this.scene, this.camera );
	}
}