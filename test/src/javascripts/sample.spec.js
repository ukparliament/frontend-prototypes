var
  test = require('selenium-webdriver/testing'),
  { Builder, until } = require('selenium-webdriver'),

  { expect } = require('chai'),

  chrome = require('chromedriver'),

  driver;


describe('sample', function() {

  // setup, this is run before all tests
  test.before(function (done) {
    /**
     * Using Chrome in headless mode
     * instead of a native headless browser so that we can:
     * visually debug issues when required
     * add/remove browser capabilities
     */
    driver = new Builder()
      .withCapabilities({
        'browserName': 'chrome',
        chromeOptions: {
          args: ['--headless']
        }
      })
      .build();
    driver.get('http://localhost:5000/templates/prototypes/front-page.html'); // ideal to store the domain as an env var
    done();
  });


  // teardown, this is run after all tests
  test.after(function (done) {
    driver.quit(); // quit the browser
    done();
  });


  describe('setCookie() and getCookie()', function() {
    test.it('can set and get cookie', function(done) {
      /**
       * Execute our UK_Parliament.setCookie() function
       * Add test data then expect test data
       */
      driver.executeScript('return UK_Parliament.setCookie("testCookieName", "testCookieValue", 1);');
      driver.manage().getCookie('testCookieName')
        .then(function(cookie) {
          expect(cookie.value).to.equal('testCookieValue');
        });
      done();
    });
  });

});
