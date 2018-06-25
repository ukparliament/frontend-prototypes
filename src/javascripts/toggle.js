
UK_Parliament.toggle = function() {

  var
    attribute = 'data-toggle',
    buttons = document.querySelectorAll('[' + attribute + '="parent-item"]');

  // End program if there are no toggle buttons.
  if (buttons.length < 1) {
    return false;
  }

  // Add click/change events to toggle buttons.
  for (var i = 0; i < buttons.length; i++) {

    if (buttons[i].tagName.toUpperCase() === 'INPUT') {
      switch(buttons[i].getAttribute('type')) {
      case 'checkbox':
      case 'radio':
        buttons[i].onchange = doToggle;
        break;
      }
    } else {
      buttons[i].onclick = doToggle;
    }

  }

  // Do toggle
  function doToggle(e) {
    e.preventDefault();

    var
      active_state = 'open',
      target = UK_Parliament.traverseUp(e.target, { 'data-toggle': 'item' });

    // Toggle class 'open' to element with the attribute `data-toggle` that
    // contains a value of 'item' or 'content'.
    UK_Parliament.toggleClass(target, active_state);
    UK_Parliament.toggleClass(
      target.querySelector('[' + attribute + '="content"]'), active_state);

  }

};

UK_Parliament.toggle();
