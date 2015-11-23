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
    this.setupAimBoundaries();

	  var geometry = new THREE.RingGeometry( 2, 2.2, 32 );
	  var material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
	  this.aim = new THREE.Mesh( geometry, material );
	  this.aim.position.x = this.position.x;
	  this.aim.position.y = this.boundaries.bottom;
    this.position.y = this.boundaries.bottom;
    this.aim.position.z = -50;
	  MainScene.camera.add(this.aim);
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

  moveAimPhone: function(x, y) {
    y += this.boundaries.bottom;
    var distance = Math.sqrt(Math.pow(x - this.position.x, 2) + Math.pow(y - this.position.y, 2));
    if(distance < this.movementThreshold) {
      return;
    }

    if (x < this.boundaries.left) {
      this.position.x = this.boundaries.left;
    }
    else if(x > this.boundaries.right) {
      this.position.x = this.boundaries.right;
    }
    else {
      this.position.x = x;
    }
    if (y < this.boundaries.bottom) {
      this.position.y = this.boundaries.bottom;
    }
    else if(y > this.boundaries.top) {
      this.position.y = this.boundaries.top;
    }
    else {
      this.position.y = y;
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
  },

  moveAimMouse: function(x, y) {
    var vector = new THREE.Vector3(
      x / window.innerWidth * 2 - 1,
      - (y / window.innerHeight) * 2 + 1,
      0.5
    );
    vector.unproject(MainScene.camera);

    var dir = vector.sub( MainScene.camera.position ).normalize();

    var distance = (this.aim.position.z - MainScene.camera.position.z) / dir.z;

    var pos = MainScene.camera.position.clone().add( dir.multiplyScalar( distance ) );
    this.aim.position.x = pos.x;
    this.aim.position.y = pos.y;
  }
}