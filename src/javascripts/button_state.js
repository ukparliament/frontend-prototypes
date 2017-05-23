// Adds 'loading icon' to button with id of 'btn__loading' when clicked

(function () {
  var btnLoad;

  // Grab elements with id of btn__loading
  btnLoad = document.getElementById('btn_loading');

  // Create event listener for 'return' keydown and send it as click event
  btnLoad.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      event.target.click();
    }
  }, false);

  // Create click event listener
  btnLoad.addEventListener('click', btnState, false);

  function btnState() {
    // Add btn--loading class to button
    this.classList.add('btn--loading');

    // Change aria-pressed to the opposite state
    this.setAttribute('aria-pressed', true);
  }
})();
