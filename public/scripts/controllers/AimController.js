"use strict";

var AimController = {
  originalZ: -2,
  aim: null,
  aimSpeed: 40,
  movementThreshold: 3,
  screenPosition: {
    x: 0,
    y: 0
  },
  prevAimPos: {
    x: 0,
    y: 0
  },

  init: function() {

	  /*var geometry = new THREE.RingGeometry( 0.05, 0.06, 6, 1, 11, 6.3 );
	  var material = new THREE.MeshBasicMaterial( { color: 0x00FFB7, side: THREE.FronSide, transparent: true, opacity: 0.6 } );
	  this.aim = new THREE.Mesh( geometry, material );
	  this.aim.position.x = 0;
	  this.aim.position.y = 0;
    this.aim.position.z = this.originalZ;
	  MainScene.camera.add(this.aim);*/
    $("#aim").css("display", "block");
    ShootController.init();
  },

  setScreenPosition: function(x, y) {
    var vector = new THREE.Vector3(
      x / window.innerWidth * 2 - 1,
      - (y / window.innerHeight) * 2 + 1,
      0.5
    );

    this.screenPosition.x = vector.x;
    this.screenPosition.y = vector.y;
  },

  moveAimPhone: function(x, y) {

    var distance = Math.sqrt(Math.pow(x - this.prevAimPos.x, 2) + Math.pow(y - this.prevAimPos.y, 2));
    if(distance < this.movementThreshold) {
      console.log("skip");
      return;
    }

    x *= (window.innerWidth / 100);
    y *= (window.innerHeight / 100);

    x = window.innerWidth / 2 + x;
    y = window.innerHeight / 2 - y;
    y += window.innerHeight / 20;

    var aimImageW = $("#aim").width();
    var aimImageH = $("#aim").height();
    $("#aim").stop();
    $("#aim").animate({
      left: x-aimImageW/2,
      top: y-aimImageH/2,
    }, this.aimSpeed, "linear");

    this.prevAimPos.x = x;
    this.prevAimPos.y = y;

    this.setScreenPosition(x, y);

    /*/////
    var vector = new THREE.Vector3(
      x / window.innerWidth * 2 - 1,
      - (y / window.innerHeight) * 2 + 1,
      1
    );

    this.screenPosition.x = vector.x;
    this.screenPosition.y = vector.y;

    var zero = new THREE.Vector3(0, 0, 0);
    var target = zero;
    var dist = this.aim.position.clone().multiplyScalar(0.5);
    target = target.add(vector.multiplyScalar(dist.length()));
    TWEEN.removeAll();
    var from = { x : this.aim.position.x, y: this.aim.position.y };

    var tween = new TWEEN.Tween(from).to(target, this.aimSpeed).start();

    var self = this;
    tween.onUpdate(function(){
        self.aim.position.x = from.x;
        self.aim.position.y = from.y;
    });*/
  },

  moveAimMouse: function(x, y) {
    var aimImageW = $("#aim").width();
    var aimImageH = $("#aim").height();
    $("#aim").css({
      left: x-aimImageW/2,
      top: y-aimImageH/2,
    });

    this.prevAimPos.x = x;
    this.prevAimPos.y = y;

    this.setScreenPosition(x, y);
    /*this.aim.position.x = vector.x;
    this.aim.position.y = vector.y;
    var zero = new THREE.Vector3(0, 0, 0);
    var pos = zero;
    var dist = this.aim.position.clone().multiplyScalar(0.5);
    console.log(dist.length());
    pos = pos.add(vector.multiplyScalar(dist.length()));
    //this.aim.position.x = pos.x;
    //this.aim.position.y = pos.y;*/

  }
}
