// Adds 'loading icon' to button with id of 'btn__loading' when clicked

(function () {
	var btnLoad,
		input,
		form,
		userAgent;

	// Grab element with id of btn__loading
	btnLoad = document.getElementById('btn_loading');

	// Grab element with id of search_box
	input = document.getElementById('input');

	// Grab element with id of pcSearch
	form = document.getElementById('postcodeSearch');

	// Get the user agent
	userAgent = window.navigator.userAgent;

	// Only create the event listener if the element exists within DOM
	if (form) {
		// bfcache fix
		window.addEventListener('pageshow', function (event) {
			if (event.persisted && btnLoad.classList.contains('btn--loading')) {
				btnLoad.classList.remove('btn--loading');
			}
		});
		// Event listener for form submit
		form.addEventListener('submit', frmState, false);
	}


	function frmState(event) {
		if (input.checkValidity() == true) {

			if (userAgent.match(/Safari/)) {
				// Prevent form submission
				event.preventDefault();
			}

			// Add btn--loading class to button
			btnLoad.classList.add('btn--loading');

			// Change aria-pressed to the opposite state
			btnLoad.setAttribute('aria-pressed', true);

			if (userAgent.match(/Safari/)) {
				// Resume form submission after 'x' ms
				setTimeout(function() {
					form.submit();
				}, 100);
			}
		}
	}
})();
