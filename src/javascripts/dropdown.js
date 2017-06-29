// Opens respective dropdown when clicked
(function () {
	var dropdown_toggle,
		dropdown_content,
		dropdown_parent;

	// Gather elements
	dropdown_toggle = document.getElementsByClassName('dropdown__toggle');

	// Add listener to dropdowns
	for (var i = 0; i < dropdown_toggle.length; i++) {
		dropdown_toggle[i].addEventListener('click', toggleDropdown, false);
	}

	// Add / Remove hidden class
	function toggleDropdown(){
		// Get parent of dropdown
		dropdown_parent = this.parentElement;
		dropdown_content = dropdown_parent.querySelector('.dropdown__content');

		//Check dropdown content
		if (dropdown_content.classList.contains('hidden')) {
			dropdown_content.classList.remove('hidden');
		} else {
			dropdown_content.classList.add('hidden');
		}
	}

})();
