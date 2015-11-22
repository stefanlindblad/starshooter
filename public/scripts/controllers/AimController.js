"use strict";

var AimController = {
  position: {
    x: 0,
    y: 0,
  },
  boundaries: {
  	top: 0,
  	right: 0,
  	bottom: 0,
  	left: 0
  },
  aim: null,
  aimSpeed: 60,
  movementThreshold: 2,

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
    var distance = Math.sqrt(Math.pow(targetPosition.x - this.position.x, 2) + Math.pow(targetPosition.y - this.position.y, 2));
    if(distance < this.movementThreshold) {
      return;
    }

    if (targetPosition.x < this.boundaries.left) {
      this.position.x = this.boundaries.left;
    }
    else if(targetPosition.x > this.boundaries.right) {
      this.position.x = this.boundaries.right;
    }
    else {
      this.position.x = targetPosition.x;
    }
    if (targetPosition.y < this.boundaries.bottom) {
      this.position.y = this.boundaries.bottom;
    }
    else if(targetPosition.y > this.boundaries.top) {
      this.position.y = this.boundaries.top;
    }
    else {
      this.position.y = targetPosition.y;
    }

    TWEEN.removeAll();
    var position = { x : this.aim.position.x, y: this.aim.position.y };
    var target = this.position;
    var tween = new TWEEN.Tween(position).to(target, this.aimSpeed).start();

    var self = this;
    tween.onUpdate(function(){
        self.aim.position.x = position.x;
        self.aim.position.y = position.y;
    });
  }
}