"use strict";

var GUIController = {
	init: function() {
		$('#gui').css("display", "block");

		$("#exitgame-button").click(function(e) {
			e.preventDefault();
			MainScene.endGame();
		})
	}
}