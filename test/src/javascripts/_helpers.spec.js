var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  { expect } = chai,

  test = require('selenium-webdriver/testing'),
  webdriver = require('selenium-webdriver'),
  { Builder, until } = webdriver,
  chrome = require('chromedriver'),

  driver;


describe('_helper.js', function() {

  test.before(function (done) {
    /**
     * Using Chrome in headless mode
     * instead of a native headless browser so that we can
     * visually debug issues when required
     */
    driver = new Builder()
      .withCapabilities({
        'browserName': 'chrome',
        chromeOptions: {
          args: ['--headless']
        }
      })
      .build();
    driver.get(process.env.SERVER + '/templates/prototypes/front-page.html');
    done();
  });

  test.after(function (done) {
    driver.quit(); // quit the browser
    done();
  });


  describe('function', function() {
    test.it('setCookie() should exist', function(done) {
      driver
        .executeScript('return UK_Parliament.setCookie;')
        .then(function(res) {
          expect(res).to.be.an('object');
        });
      done();
    });

    test.it('getCookie() should exist', function(done) {
      driver
        .executeScript('return UK_Parliament.getCookie;')
        .then(function(res) {
          expect(res).to.be.an('object');
        });
      done();
    });

    test.it('httpRequest() should exist', function(done) {
      driver
        .executeScript('return UK_Parliament.httpRequest;')
        .then(function(res) {
          expect(res).to.be.an('object');
        });
      done();
    });
  });


  describe('setCookie() and getCookie()', function() {
    test.it('can set and get cookie', function(done) {
      driver.executeScript('return UK_Parliament.setCookie("testCookieName", "testCookieValue", 1);');
      driver.manage().getCookie('testCookieName')
        .then(function(cookie) {
          expect(cookie.value).to.equal('testCookieValue');
        });
      done();
    });
  });

});
