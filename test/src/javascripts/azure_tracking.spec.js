var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  { expect } = chai,

  test = require('selenium-webdriver/testing'),
  webdriver = require('selenium-webdriver'),
  { Builder } = webdriver,
  chrome = require('chromedriver'),

  driver;


describe('azure_tracking.js', function() {

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
    test.it('azureTracking() should exist', function(done) {
      driver
        .executeScript('return UK_Parliament.azureTracking;')
        .then(function(res) {
          expect(res).to.be.an('object');
        });
      done();
    });
  });

});
