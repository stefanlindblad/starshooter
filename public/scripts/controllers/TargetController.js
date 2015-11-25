"use strict";

var TargetController = {

	targets: [],
	maxTargets: 20,

	init: function() {
		this.createPathTargets();
	},

	getTargets: function() {
		return this.targets;
	},

	addTarget: function(position, tangent) {
		var target = Target.create(position, tangent);
		this.targets.push(target);

		if(this.targets.length >= this.maxTargets):
			this.targets.shift();
	},
}