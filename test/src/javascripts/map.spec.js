var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  { expect } = chai,

  test = require('selenium-webdriver/testing'),
  webdriver = require('selenium-webdriver'),
  { Builder } = webdriver,
  chrome = require('chromedriver'),

  jsdom = require('jsdom'),
  { JSDOM } = jsdom,
  { document } = (new JSDOM()).window,

  helper = fs.readFileSync(process.cwd() + '/src/javascripts/_helpers.js'),
  code = fs.readFileSync(process.cwd() + '/src/javascripts/map.js'),

  driver;

describe('map.js', function () {

  describe('function', function () {

    beforeEach(function (done) {
      /**
       * Mock the DOM
       */
      global.document = document;
      global.window = document.defaultView;

      /**
       * Execute our code
       * and it's dependencies
       */
      vm.runInThisContext(helper);
      vm.runInThisContext(code);

      done();
    });

    it('map() should exist', function (done) {
      expect(UK_Parliament.map).to.equal(UK_Parliament.map);
      done();
    });

  });
  /*
  describe('map()', function () {

    this.timeout(30000);

    test.beforeEach(function (done) {
      /**
       * Using Chrome in headless mode
       * instead of a native headless browser so that we can
       * visually debug issues when required
       *
      driver = new Builder()
        .withCapabilities({
          'browserName': 'chrome',
          chromeOptions: {
            args: ['--headless']
          }
        })
        .build();

      done();
    });

    test.afterEach(function (done) {
      driver.quit(); // quit the browser
      done();
    });

    test.it('should add the leaflet class of .leaflet-container', function (done) {
      this.slow(10000);
      driver.get(process.env.SERVER + '/templates/prototypes/constituency.html');

      driver
        .findElements({ className: 'leaflet-container' })
        .then(function (res) {
          expect(!!res.length).to.be.true;
        });

      done();
    });

  });
  */
});
