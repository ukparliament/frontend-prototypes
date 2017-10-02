// Opens respective dropdown when clicked

UK_Parliament.dropdownToggle = function() {

  // Local variables
  var
    dropdown_toggle = document.getElementsByClassName('dropdown__toggle'),
    dropdown_parent,
    toggle = function(e) {
      e.preventDefault();

      // Get parent of dropdown
      dropdown_parent = this.parentElement;
      dropdown_content = dropdown_parent.querySelector('.dropdown__content');

      // Check dropdown content
      if (dropdown_parent.classList.contains('open')) {
        dropdown_parent.classList.remove('open');
      } else {
        dropdown_parent.classList.add('open');
      }
    };

  // Add listener to dropdowns
  for (var x = 0; x < dropdown_toggle.length; x++) {
    dropdown_toggle[x].addEventListener('click', toggle, false);
  }
};

UK_Parliament.dropdownToggle();
