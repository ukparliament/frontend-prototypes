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


describe('map.js', function() {

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
    test.it('map() should exist', function(done) {
      driver
        .executeScript('return UK_Parliament.map;')
        .then(function(res) {
          expect(res).to.be.an('object');
        });
      done();
    });
  });


  describe('map()', function() {
    test.it('should add the leaflet class of .leaflet-container', function(done) {
      driver
        .wait(until.elementLocated({ css: '#mapbox' }))
        .getAttribute('class')
        .then(function(attribute) {
          var value = attribute.split(' ').filter(function(val) {
            return val === 'leaflet-container';
          });
          expect(value).to.include('leaflet-container');
        });
      done();
    });
  });

});
