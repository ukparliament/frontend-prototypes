// Adds 'loading icon' to button with id of 'btn__loading' when clicked

(function () {
	var btnLoad;
	var input;

	// Grab elements with id of btn__loading
	btnLoad = document.getElementById('btn_loading');

	// Grab elements with id of search_box
	input = document.getElementById('input');

	// Only create the event listener if the element exists within DOM
	if (btnLoad) {
		// Create event listener for 'return' keydown and send it as click event
		btnLoad.addEventListener('keydown', function (event) {
			if (event.keyCode === 13) {
				event.target.click();
			}
		}, false);

		// Create click event listener
		btnLoad.addEventListener('click', btnState, false);
	}

	function btnState() {
		// If HTML5 attribute validation passes
		if (input.checkValidity() === true) {
			// Add btn--loading class to button
			this.classList.add('btn--loading');

			// Change aria-pressed to the opposite state
			this.setAttribute('aria-pressed', true);
		}
	}
})();
