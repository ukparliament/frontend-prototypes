(function () {

  // CONTENT SLIDER
  contentSlider = function (ids, cls) {

    var blk;
    var elm;

    // check for valid id - store variable or handle error
    if (document.getElementById(ids) !== null) {
      blk = document.getElementById(ids);
    } else {
      console.log('No corresponding id found');
    }

    // check for empty array - store variable or handle error
    if (blk.getElementsByClassName(cls).length) {
      elm = blk.getElementsByClassName(cls);
    } else {
      console.log('No corresponding classes found');
    }

    // grab elements array and append class to arrow icons
    var j = elm.length;
    for (var i = 0; i < j; i++) {
      var arw = document.createElement('span');
      arw.className = 'open';
      elm[i].appendChild(arw);
      elm[i].nextElementSibling.style.display = 'none';
      elm[i].setAttribute('tabindex', (~~[i] + 1));
    }

    // toggle content function
    function toggleContent(evt) {
      if (evt.target && evt.target.className === cls) {
        var content = evt.target.nextElementSibling;
        if (content.style.display == 'none') {
          content.style.display = 'block';
          evt.target.lastChild.className = 'close';
        } else {
          content.style.display = 'none';
          evt.target.lastChild.className = 'open';
        }
      }

      evt.stopPropagation();
      return false;
    }

    // create event listener for touch and send it as click event
    blk.addEventListener('touchend', function (evt) {
      evt.preventDefault();
      evt.target.click();
    }, false);

    // create event listener for 'return' keydown and send it as click event
    blk.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        evt.target.click();
      }
    }, false);

    // create click event listener
    blk.addEventListener('click', toggleContent, false);
  };
})();
