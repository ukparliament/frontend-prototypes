// Add cookie to session

var
  cookie = false,
  cookieContent = document.getElementById('cookie');

checkCookie('UK_Parliament__seen_cookie_message');
if (!cookie) {
  cookieContent.style.display = 'block';
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires;
}

function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

function checkCookie(cname) {
  var cookieName = getCookie(cname);
  if (cookieName !== '') {
    cookie = true;
  } else if (cookieName !== '' && cookieName !== null) {
    setCookie(cname, cvalue, exdays);
  }
}

setCookie('UK_Parliament__seen_cookie_message', 'yes', 28);
