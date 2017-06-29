(function () {
	var dropdown_content;
	// JAVASCRIPT AVAILABILITY

	// switches 'no-js' to 'has-js' class on body
	document.body.className = 'has-js';

	// Hide dropdowns if JS is on
	dropdown_content = document.getElementsByClassName('dropdown__content');
	for (var i = 0; i < dropdown_content.length; i++) {
		dropdown_content[i].classList.add('hidden');
	}

})();
