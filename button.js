//  Copyright 2015 Nathan Dickson


(function(){
	'use strict';

	var shadows = { };

	var clickHandler = function() {

		this.removeEventListener('mousedown', clickHandler);

		var audio = document.getElementById('navButtonClick');
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
			audio.play();
		}

		var that = this;
		var id = that.getAttribute('id');
		var stage = 'shrinking';
		var counter = 0;
		var steps = 5;
		var scale = 1;
		var multiplier = 0.98;
		var smallestScale = Math.pow(multiplier, steps);
		var scaleRange = 1 - smallestScale;
		var shadow, timer, distance, opacity;

		shadow = shadows[id];
		opacity = shadow.opacity;
//		setShadow(this, shadow.distance, opacity);

		var timerCallback = function() {
			scale *= multiplier;
			that.style.transform = 'scale(' + scale + ')';
			distance = shadow.distance * (scale - smallestScale) / scaleRange;
			setShadow(that, distance, opacity);
			counter++;
			if (counter < steps)  return;
			if (stage === 'shrinking') {
				counter = 0;
				multiplier = 1 / multiplier;
				stage = 'growing';
			} else {
				clearInterval(timer);
				that.addEventListener("mousedown", clickHandler);
				that.style.transform = "scale(1)";
				setShadow(that, shadow.distance, opacity);
			}
		};

		timer = setInterval(timerCallback, (1000 / 60));
	};

	var setShadow = function(button, size, opacity) {
		button.style.boxShadow =
			size + 'px ' + size + 'px ' + (size / 2) + 'px 0px rgba(0, 0, 0, ' + opacity + ')';
	};

	var attachButtons = function() {
		var buttons = document.getElementsByClassName('button');
		if (!buttons) return;
		for (var i = 0; i < buttons.length; i++) {
			var button = buttons[i];
			var id = button.getAttribute('id');
			if (!id)  continue;
			button.addEventListener("mousedown", clickHandler);
			setShadow(button, 8, 0.5);
			shadows[id] = { distance: 8, opacity:0.5 };
		}
	};

	attachButtons();

})();  //  Invoke



