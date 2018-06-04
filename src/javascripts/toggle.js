
UK_Parliament.toggle = function() {

  var
    active_state = 'open',
    toggle_attr = 'data-toggle',
    toggles = document.querySelectorAll('[' + toggle_attr + ']');

  // End program if there are no toggle buttons.
  if (toggles.length < 1) return false;

  // Add click events to toggle buttons
  for (var i = 0; i < toggles.length; i++) {

    // Only add click events to elements with the attribute
    // `data-toggle` that don't have the value 'item'.
    if (toggles[i].getAttribute(toggle_attr) !== 'item') {
      toggles[i].onclick = doToggle;
    }

  }

  function doToggle(e) {
    e.preventDefault();

    var
      toggle = e.target,
      target = undefined,
      toggle_value = toggle.getAttribute(toggle_attr);

    // Set target element to coresponding DOM-Object
    // based on the clicked toggle button's value.
    switch(toggle_value) {

    case 'next-item':
      target = toggle.nextElementSibling;
      break;

    case 'previous-item':
      target = toggle.previousElementSibling;
      break;

    case 'parent-item':
      target = UK_Parliament.traverseUp(toggle, { 'data-toggle': 'item' });
      break;

    }

    if (
      !target ||
      !target.hasAttribute(toggle_attr) ||
      target.getAttribute(toggle_attr) !== 'item'
    ) {
      throw 'The toggle button you clicked on with the attribute ' +
      '`data-toggle="' + toggle_value + '"` can\'t find a toggle ' +
      'element \'' + toggle_value + '\' to it. The element to ' +
      'toggle should have the attribute `data-toggle="item"`.';
    }

    // Add/remove active state on toggle button and
    // target element.
    toggleActiveState(target);

    // Add/remove active state on toggle buttons that
    // are bound to toggle the same target element.
    toggleActiveState(target.previousElementSibling, 'next-item');
    toggleActiveState(target.nextElementSibling, 'previous-item');
    toggleActiveState(target.querySelector('[' + toggle_attr + ']'), 'parent-item');

  }

  function toggleActiveState(element, toggle_value) {

    toggle_value = toggle_value || 'item';

    if (
      element &&
      element.hasAttribute(toggle_attr) &&
      element.getAttribute(toggle_attr) === toggle_value
    ) {

      if (element.classList.contains(active_state)) {
        element.classList.remove(active_state);
      } else {
        element.classList.add(active_state);
      }

    }

  }

};

UK_Parliament.toggle();
