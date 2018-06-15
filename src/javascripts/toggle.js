
UK_Parliament.toggle = function() {

  var
    active_state = 'open',
    toggle_attr = 'data-toggle',
    toggles = document.querySelectorAll('[' + toggle_attr + ']');

  // End program if there are no toggle buttons.
  if (toggles.length < 1) {
    return false;
  }

  // Add click or change events to toggle buttons.
  for (var i = 0; i < toggles.length; i++) {

    // Only add click/change events to elements with the attribute `data-toggle`
    // that don't have the value 'item'.
    if (
      toggles[i].getAttribute(toggle_attr) !== 'item' &&
      toggles[i].getAttribute(toggle_attr) !== 'content'
    ) {

      if (toggles[i].tagName.toUpperCase() === 'INPUT') {
        switch(toggles[i].getAttribute('type')) {
        case 'checkbox':
        case 'radio':
          toggles[i].onchange = doToggle;
          break;
        }
      } else {
        toggles[i].onclick = doToggle;
      }

    }

  }

  function doToggle(e) {
    e.preventDefault();

    var
      toggle = e.target,
      target = undefined,
      toggle_value = toggle.getAttribute(toggle_attr);

    // Set target element to coresponding DOM-Object based on the clicked toggle
    // button's value.
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

    // Throw error if toggle button can't find the toggle target.
    if (
      !target ||
      !target.hasAttribute(toggle_attr) ||
      target.getAttribute(toggle_attr) !== 'item'
    ) {
      throw 'The toggle button you clicked on with the attribute ' +
      '`' + toggle_attr +'="' + toggle_value + '"` can\'t find a ' +
      'toggle element \'' + toggle_value + '\' to it. The element ' +
      'to toggle should have the attribute `' + toggle_attr +
      '="item"`.';
    }

    toggleRelated([
      target,
      target.previousElementSibling,
      target.nextElementSibling,
      target.querySelectorAll('[' + toggle_attr + ']')
    ]);

  }

  function toggleRelated(elements) {
    for (var j = 0; j < elements.length; j++) {
      if (elements[j] !== null && elements[j].length) {
        for (var k = 0; k < elements[j].length; k++) {
          toggleActive(elements[j][k]);
        }
      } else if (elements[j] === null) {
        continue;
      } else {
        toggleActive(elements[j]);
      }
    }
  }

  function toggleActive(element) {
    if (element.hasAttribute(toggle_attr)) {
      if (
        element.getAttribute(toggle_attr) === 'item' ||
        element.getAttribute(toggle_attr) === 'next-item' ||
        element.getAttribute(toggle_attr) === 'previous-item' ||
        element.getAttribute(toggle_attr) === 'parent-item' ||
        element.getAttribute(toggle_attr) === 'content'
      ) {
        if (element.classList.contains(active_state)) {
          element.classList.remove(active_state);
        } else {
          element.classList.add(active_state);
        }
      }
    }
  }

};

UK_Parliament.toggle();
