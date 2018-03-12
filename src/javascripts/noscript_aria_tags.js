// Add aria attribute to <noscript> tags

UK_Parliament.nsAria = function () {
  var noScript = document.getElementsByTagName('noscript');

  if (noScript) {
    // Loop through collected tags and add aria attribute
    for (var i = 0; i < noScript.length; i++) {
      noScript[i].setAttribute('aria-hidden', 'true');
    }
  }

};

UK_Parliament.nsAria();
