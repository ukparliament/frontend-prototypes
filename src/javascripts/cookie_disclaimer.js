/**
 * Check if a cookie exists
 * If cookie does not exists, display the cookie status banner
 * and set a cookie
 * @param {string} cname the cookie name
 * @param {string} cvalue the cookie value
 * @param {number} exdays the cookie expiration date
 */

UK_Parliament.cookieBanner = function (cname, cvalue, exdays) {

  var
    cookieContent = document.getElementById('cookie'),
    cookieName = this.getCookie(cname);

  if (!cookieName && cookieContent) {
    cookieContent.style.display = 'block';
    this.setCookie(cname, cvalue, exdays);
  }
};

UK_Parliament.cookieBanner('UK_Parliament__seen_cookie_message', 'yes', 28);
