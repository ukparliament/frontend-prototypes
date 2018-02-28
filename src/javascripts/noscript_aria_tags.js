// Add aria attritube to <noscript> tags

UK_Parliament.nsAria = function () {
  if (document.querySelector('body.has-js')) {
    if (document.getElementsByTagName('noscript')) {

      // Grab all <noscript> tags
      var nsTags = (document.getElementsByTagName('noscript'));

      // Loop through collected tags and add aria attribute
      for (var i = 0; i < nsTags.length; i++) {
        nsTags[i].setAttribute('aria-hidden', 'true');
      }

    }
  }
};

UK_Parliament.nsAria();
