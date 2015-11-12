"use strict";

var AimController = {
  x: 0,
  y: 0,
  z: 0,
  aim: null,
  boundaries: {
  	top: 0,
  	right: 0,
  	bottom: 0,
  	left: 0
  },

  init: function() {
	  var geometry = new THREE.RingGeometry( 1, 2, 32 );
	  var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
	  this.aim = new THREE.Mesh( geometry, material );
	  this.aim.position.x = this.x;
	  this.aim.position.y = this.y;

	  MainScene.scene.add(this.aim);

	  this.setupAimBoundaries();
  },

  setupAimBoundaries: function() {
    var vFOV = MainScene.camera.fov * Math.PI / 180;
    var height = 2 * Math.tan( vFOV / 2 ) * MainScene.camera.position.z;
	  var width = height * MainScene.camera.aspect;
	  this.boundaries.top = height / 2;
	  this.boundaries.right = width / 2;
	  this.boundaries.bottom = height / 2 * -1;
	  this.boundaries.left = width / 2 * -1;
  },

  moveAim: function(targetPosition) {
    if (targetPosition.x < this.boundaries.left) {
      this.x = this.boundaries.left;
    }
    else if(targetPosition.x > this.boundaries.right) {
      this.x = this.boundaries.right;
    }
    else {
      this.x = targetPosition.x;
    }
    if (targetPosition.y < this.boundaries.bottom) {
      this.y = this.boundaries.bottom;
    }
    else if(targetPosition.y > this.boundaries.top) {
      this.y = this.boundaries.top;
    }
    else {
      this.y = targetPosition.y;
    }
    this.aim.position.x = this.x;
    this.aim.position.y = this.y
  }
}