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


describe('noscript_aria_tags.js', function() {

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
    driver.get(process.env.SERVER + '/templates/prototypes/constituency.html');
    done();
  });

  test.after(function(done) {
    driver.quit(); // quit the browser
    done();
  });


  describe('function', function() {
    test.it('nsAria() should exist', function(done) {
      driver
        .executeScript('return UK_Parliament.nsAria;')
        .then(function(res) {
          expect(res).to.be.an('object');
        });
      done();
    });
  });


  describe('nsAria()', function() {
    test.it('should add aria-hidden="true" attribute', function(done) {
      driver
        .wait(until.elementLocated({ tagName: 'noscript' }))
        .getAttribute('aria-hidden')
        .then(function(attribute) {
          expect(attribute).to.equal('true');
        });
      done();
    });
  });

});
