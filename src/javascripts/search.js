UK_Parliament.search = function () {
  var
    header = document.querySelector('header'),
    logo = header.querySelector('.uk_parliament'),
    form = header.querySelector('form'),
    input = header.querySelector('input'),
    inputGroup = header.querySelector('.input-group'),
    button = header.querySelector('button'),
    buttonToggle = header.querySelector('.btn--toggle'),
    desktop = 768;

  if(buttonToggle) {
    checkScreenSize();
    buttonToggle.addEventListener('click', toggleSearch);
    window.addEventListener('orientationchange', checkScreenSize);
  }

  function checkScreenSize() {
    if (window.innerWidth <= desktop) {
      buttonToggle.removeAttribute('tabIndex');
      (form.classList.contains('open')) ? removeAttr() : setAttr();
    } else {
      removeAttr();
      buttonToggle.setAttribute('tabIndex', '-1');
      buttonToggle.setAttribute('aria-hidden', 'true');
    }
  }

  function removeAttr() {
    inputGroup.removeAttribute('aria-hidden');
    input.removeAttribute('tabIndex');
    button.removeAttribute('tabIndex');
  }

  function setAttr() {
    inputGroup.setAttribute('aria-hidden', 'true');
    input.setAttribute('tabIndex', '-1');
    button.setAttribute('tabIndex', '-1');
  }

  function toggleSearch(e) {
    (form.classList.contains('open')) ? closeSearch(e) : openSearch(e);
  }

  function closeSearch(e) {
    e.preventDefault();
    logo.classList.remove('portcullis');
    form.classList.remove('open');
    buttonToggle.setAttribute('aria-label', 'open search');
    setAttr();
  }

  function openSearch(e) {
    e.preventDefault();
    logo.classList.add('portcullis');
    form.classList.add('open');
    buttonToggle.setAttribute('aria-label', 'close search');
    input.focus();
    removeAttr();
  }
};

UK_Parliament.search();
