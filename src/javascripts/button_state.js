// Adds 'loading icon' to button[type="submit"] when clicked

(function () {
	var buttons = document.querySelectorAll('button');

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', btnClick, false);
	}

	function btnClick(e) {
		if (this.type.toLowerCase() === 'submit') {
			this.classList.add('btn--loading');
		}
	}

})();
