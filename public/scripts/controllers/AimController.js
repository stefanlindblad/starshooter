"use strict";

var AimController = {
  originalZ: -2,
  aim: null,
  aimSpeed: 100,
  movementThreshold: 2,
  screenPosition: {
    x: 0,
    y: 0
  },

  init: function() {

	  var geometry = new THREE.RingGeometry( 0.05, 0.06, 6, 1, 11, 6.3 );
	  var material = new THREE.MeshBasicMaterial( { color: 0x00FFB7, side: THREE.FronSide, transparent: true, opacity: 0.6 } );
	  this.aim = new THREE.Mesh( geometry, material );
	  this.aim.position.x = 0;
	  this.aim.position.y = 0;
    this.aim.position.z = this.originalZ;
	  MainScene.camera.add(this.aim);

    ShootController.init();
  },

  moveAimPhone: function(x, y) {
    var distance = Math.sqrt(Math.pow(x - this.screenPosition.x, 2) + Math.pow(y - this.screenPosition.y, 2));
    if(distance < this.movementThreshold) {
      return;
    }
    this.screenPosition.x = x;
    this.screenPosition.y = y;

    x *= 5;
    y *= 5;
    x = window.innerWidth / 2 + x;
    y = window.innerHeight / 2 - y;
    y += window.innerHeight / 20;
    var vector = new THREE.Vector3(
      x / window.innerWidth * 2 - 1,
      - (y / window.innerHeight) * 2 + 1,
      1
    );

    var zero = new THREE.Vector3(0, 0, 0);
    var target = zero;
    var dist = this.aim.position.clone().multiplyScalar(0.5);
    target = target.add(vector.multiplyScalar(dist.length()));
    //this.aim.position.x = target.x;
    //this.aim.position.y = target.y;
    TWEEN.removeAll();
    var from = { x : this.aim.position.x, y: this.aim.position.y };

    var tween = new TWEEN.Tween(from).to(target, this.aimSpeed).start();

    var self = this;
    tween.onUpdate(function(){
        self.aim.position.x = from.x;
        self.aim.position.y = from.y;
    });
  },

  moveAimMouse: function(x, y) {
    this.screenPosition.x = x;
    this.screenPosition.y = y;
    var vector = new THREE.Vector3(
      x / window.innerWidth * 2 - 1,
      - (y / window.innerHeight) * 2 + 1,
      1
    );
    this.aim.position.x = vector.x;
    this.aim.position.y = vector.y;
    var zero = new THREE.Vector3(0, 0, 0);
    var pos = zero;
    var dist = this.aim.position.clone().multiplyScalar(0.5);
    pos = pos.add(vector.multiplyScalar(dist.length()));
   // this.aim.position.x = pos.x;
   // this.aim.position.y = pos.y;
  }
}