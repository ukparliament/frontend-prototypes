// Show file name, file upload status and check file size

UK_Parliament.fileUploader = function () {

  var fileInput = document.querySelector('[data-file-upload="button"]');

  if (fileInput) {

    // Local variables
    var
      fileIcon = document.querySelector('[data-file-upload="icon"]'),
      fileStatus = document.querySelector('[data-file-upload="status"]'),
      fileSizeLimit = fileInput.getAttribute('data-file-size') ? fileInput.getAttribute('data-file-size') : '5242880',
      fileSizeLimitFormatted = fileSizeLimit.substring(0, 1);

    fileInput.onchange = function () {

      // Grab file object reference, determine size and construct filename
      var
        fileObject = this.files,
        fileObjectSize = fileObject[0].size,
        fileName = this.value.split(/(\\|\/)/g).pop(),
        fileNameFormatted = '<strong>\'' + fileName + '\'</strong>';

      // Check for aria attribute and manage addition / class removal accordingly
      fileStatus.hasAttribute('aria-live') ? fileStatus.classList.remove('message--error') : fileStatus.setAttribute('aria-live', 'assertive');

      // Check if file exceeds size limit passed in data-file-size attribute (default set to 5MB in binary)
      if (fileObjectSize > fileSizeLimit) {
        fileStatus.classList.add('message--error');
        fileStatus.innerHTML = 'The file you have uploaded is too big. Please make sure it is smaller than ' + fileSizeLimitFormatted + 'MB.';
        fileIcon.setAttribute('data-file-upload', 'failure');

      // Check if linked file object is present
      } else if (fileObject) {
        fileStatus.innerHTML = fileNameFormatted + ' is ready to be uploaded';
        fileIcon.setAttribute('data-file-upload', 'success');

      // Return text to default state if no linked file object exists
      } else {
        fileStatus.innerHTML = 'No file(s) selected';
        fileIcon.setAttribute('data-file-upload', 'icon');
      }
    };

    // Check if element is in focus and add class for Firefox
    fileInput.addEventListener('focus', function () {
      fileInput.classList.add('js-has-focus');
    });

    // Check if element is out of focus and remove class for Firefox
    fileInput.addEventListener('blur', function () {
      fileInput.classList.remove('js-has-focus');
    });
  }
};

UK_Parliament.fileUploader();
