UK_Parliament.search = function () {
  var
    header = document.querySelector('header'),
    logo = header.querySelector('.uk_parliament'),
    searchComponent = header.querySelector('.search__global'),
    input = header.querySelector('input'),
    inputGroup = header.querySelector('.input-group'),
    button = header.querySelector('button'),
    searchToggle = header.querySelector('.search__global__toggle'),
    desktop = 768;

  if(searchComponent) {
    checkScreenSize();
    searchToggle.addEventListener('click', toggleSearch);
    window.addEventListener('orientationchange', checkScreenSize);
  }

  function checkScreenSize() {
    if (window.innerWidth <= desktop) {
      searchToggle.removeAttribute('tabIndex');
      (searchComponent.classList.contains('open')) ? removeAttr() : setAttr();
    } else {
      removeAttr();
      searchToggle.setAttribute('tabIndex', '-1');
      searchToggle.setAttribute('aria-hidden', 'true');
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
    (searchComponent.classList.contains('open')) ? closeSearch(e) : openSearch(e);
  }

  function closeSearch(e) {
    e.preventDefault();
    logo.classList.remove('portcullis');
    searchComponent.classList.remove('open');
    searchToggle.setAttribute('aria-label', 'open search');
    setAttr();
  }

  function openSearch(e) {
    e.preventDefault();
    logo.classList.add('portcullis');
    searchComponent.classList.add('open');
    searchToggle.setAttribute('aria-label', 'close search');
    input.focus();
    removeAttr();
  }
};

UK_Parliament.search();
