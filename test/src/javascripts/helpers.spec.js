const testHelper = require(process.cwd() + '/test/helpers/test-helper');
const {expect} = require('chai');

describe('UK_Parliament()', () => {

  let seleniumSetup = testHelper.seleniumSetup('http://localhost:5000/templates/prototypes/front-page.html');

  describe('setCookie() and getCookie()', () => {
    it('can set and get cookie', async () => {
      await seleniumSetup.driver.executeScript('return UK_Parliament.setCookie("testCookieName", "testCookieValue", 1);');
      await seleniumSetup.driver.manage().getCookie('testCookieName')
        .then(function(cookie) {
          expect(cookie.value).to.equal('testCookieValue');
        });
    });
  });
});
