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


describe('cookie_disclaimer.js', function() {

  test.before(function(done) {
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

  test.after(function(done) {
    driver.quit(); // quit the browser
    done();
  });


  describe('function', function() {
    test.it('cookieBanner() should exist', function(done) {
      driver
        .executeScript('return UK_Parliament.cookieBanner;')
        .then(function(res) {
          expect(res).to.be.an('object');
        });
      done();
    });
  });


  describe('cookieBanner()', function() {
    test.it('has set a class to display the cookie banner', function(done) {
      driver
        .wait(until.elementLocated({ css: '#cookie' }))
        .getAttribute('class')
        .then(function(attribute) {
          var value = attribute.split(' ').filter(function(val) {
            return val === 'show';
          });
          expect(value).to.include('show');
        });
      done();
    });

    test.it('has set a cookie', function(done) {
      driver.manage().getCookie('UK_Parliament__seen_cookie_message')
        .then(function(cookie) {
          expect(cookie.value).to.equal('yes');
        });
      done();
    });
  });

});
