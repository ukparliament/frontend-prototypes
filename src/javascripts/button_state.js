// Adds 'loading icon' to button[type="submit"] when clicked

UK_Parliament.buttonLoader = function() {

  // Local variables
  var
    forms = document.querySelectorAll('form'),
    formSubmit = function() {

      // If form submission contains valid data
      if ( this.checkValidity() ) {

        // Select <button> elements
        var buttons = this.querySelectorAll('button');
        for (var i = 0; i < buttons.length; i++) {
          // if button type=submit
          if (buttons[i].type.toLowerCase() === 'submit') {
            buttons[i].classList.add('btn--loading');
          }
        }
      }
    };

  for (var f = 0; f < forms.length; f++) {
    forms[f].addEventListener('submit', formSubmit, false);
  }
};

//UK_Parliament.buttonLoader();
