/**
 * UK_Parliament, global functions
 */

var UK_Parliament = (function () {

  var
    /**
     * Set a cookie
     * @param {string} cname the cookie name
     * @param {string} cvalue the cookie value
     * @param {number} exdays the cookie expiration days
     */
    setCookie = function (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + '; ' + expires + ';path=/';
    },

    /**
     * Get a cookie
     * @param {string} cname the cookie name
     */
    getCookie = function (cname) {
      var name = cname + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return false;
    },

    /**
     * Create AJAX request
     * @param {string} path the location of the object to request
     * @param {function} callback a callback which is called after a response is recieved
     */
    httpRequest = function (path, callback) {
      var request = new XMLHttpRequest();

      request.open('GET', path);
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 200) {
            var response = JSON.parse(request.responseText);
            if (callback) {
              callback(response);
            }
          } else {
            console.log(request.statusText);
          }
        }
      };
      request.send();
    };

  return {
    setCookie: setCookie,
    getCookie: getCookie,
    httpRequest: httpRequest
  };
})();
