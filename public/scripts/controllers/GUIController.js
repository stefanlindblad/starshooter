"use strict";

var GUIController = {
	init: function() {
		$('#gui').css("display", "block");
		$('#gui').removeClass("fade-in");
		$('#gui').addClass("fade-out");

		$("#exitgame-button").click(function(e) {
			e.preventDefault();
			MainScene.endGame();
		})
	}
}