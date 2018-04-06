// Open the print dialog when clicking the print button

UK_Parliament.printButton = function () {

  var
    printButtons = document.querySelectorAll('.btn--print');

  if (printButtons) {
    for (var i = 0; i < printButtons.length; i++) {

      // Add click event to print buttons
      printButtons[i].onclick = function(e) {
        e.preventDefault();
        window.print();
      };

      // Get ancestor of an element based on matching attributes by traversing up the DOM
      // > This is to make the print button visible when JavaScript is enabled
      UK_Parliament.traverseUp(
        printButtons[i],
        {
          'class': 'visually-hidden',
          'aria-hidden': 'true'
        },
        function(parent) {
          parent.classList.remove('visually-hidden');
          parent.removeAttribute('aria-hidden');
        }
      );

    }
  }
};

UK_Parliament.printButton();
