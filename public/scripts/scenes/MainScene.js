"use strict";

var MainScene = {

	scene: null,
	camera: null,
	renderer: null,

	init: function() {
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.camera.position.z = 10;

		this.renderer = new THREE.WebGLRenderer({antialias: true});
	  	this.renderer.setSize( window.innerWidth, window.innerHeight );
	  	document.body.appendChild( this.renderer.domElement );

	  	this.render();
	},

	render: function() {
		requestAnimationFrame( this.render.bind(this) );
		TWEEN.update();
    	this.renderer.render( this.scene, this.camera );
	}
}