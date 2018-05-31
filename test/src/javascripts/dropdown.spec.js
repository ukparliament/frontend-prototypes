var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  { expect } = chai,

  test = require('selenium-webdriver/testing'),
  webdriver = require('selenium-webdriver'),
  { Builder, until } = webdriver,
  chrome = require('chromedriver'),

  value, driver;


describe('dropdown.js', function() {

  test.beforeEach(function(done) {
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
    driver.get(process.env.SERVER + '/templates/prototypes/_toggles.html');
    done();
  });

  test.afterEach(function(done) {
    driver.quit(); // quit the browser
    done();
  });


  describe('function', function() {
    test.it('dropdownToggle() should exist', function(done) {
      driver
        .executeScript('return UK_Parliament.dropdownToggle;')
        .then(function(res) {
          expect(res).to.be.an('object');
        });
      done();
    });
  });


  describe('dropdownToggle()', function() {
    test.it('.dropdown has class .open', function(done) {
      driver.wait(until.elementLocated({ css: '.dropdown__toggle > h2 > a' })).click();
      driver
        .wait(until.elementLocated({ css: '.dropdown' }))
        .getAttribute('class')
        .then(function(attribute) {
          value = attribute.split(' ').filter(function(val) {
            return val === 'open';
          });
          expect(value).to.include('open');
        });
      done();
    });

    test.it('.dropdown should not contain class .open', function(done) {
      driver
        .wait(until.elementLocated({ css: '.dropdown' }))
        .getAttribute('class')
        .then(function(attribute) {
          value = attribute.split(' ').filter(function(val) {
            return val !== 'open';
          });
          expect(value).to.not.include('open');
        });
      done();
    });

    test.it('dropdown__content should be displayed', function(done) {
      driver.wait(until.elementLocated({ css: '.dropdown__toggle > h2 > a' })).click();
      driver
        .wait(until.elementLocated({ css: '.open > .dropdown__content' }))
        .getCssValue('visibility')
        .then(function(attribute) {
          expect(attribute).to.equal('visible');
        });
      done();
    });

    test.it('dropdown__content should not be displayed', function(done) {
      driver
        .wait(until.elementLocated({ css: '.dropdown > .dropdown__content' }))
        .getCssValue('visibility')
        .then(function(attribute) {
          expect(attribute).to.equal('hidden');
        });
      done();
    });
  });

});
