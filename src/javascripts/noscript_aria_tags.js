// Add aria attribute to <noscript> tags

UK_Parliament.nsAria = function () {
  var
    hasJS = document.querySelector('body.has-js'),
    noScript = document.getElementsByTagName('noscript');

  if (hasJS && noScript) {
    // Loop through collected tags and add aria attribute
    for (var i = 0; i < noScript.length; i++) {
      noScript[i].setAttribute('aria-hidden', 'true');
    }
  }

};

UK_Parliament.nsAria();
