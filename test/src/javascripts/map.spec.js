var
  fs = require('fs'),
  vm = require('vm'),

  decache = require('decache'),

  chai = require('chai'),
  { expect } = chai,

  test = require('selenium-webdriver/testing'),
  webdriver = require('selenium-webdriver'),
  { Builder, By, until } = webdriver,
  chrome = require('chromedriver'),

  jsdom = require('jsdom'),
  { JSDOM } = jsdom,
  { document } = (new JSDOM()).window,

  helper = fs.readFileSync(process.cwd() + '/src/javascripts/_helpers.js'),
  code = fs.readFileSync(process.cwd() + '/src/javascripts/map.js'),

  driver, server;

describe('map.js', function () {

  describe('function', function () {

    before(function (done) {
      global.document = document;
      global.window = document.defaultView;
      global.XMLHttpRequest = window.XMLHttpRequest;

      vm.runInThisContext(helper);
      vm.runInThisContext(code);

      done();
    });

    it('map() should exist', function (done) {
      expect(UK_Parliament.map).to.equal(UK_Parliament.map);
      done();
    });

  });

  describe('map', function () {

    this.timeout(30000);

    test.beforeEach(function (done) {
      decache(process.cwd() + '/server.js');
      server = require(process.cwd() + '/server.js');

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
      driver.quit();
      server.close();
      done();
    });

    test.it('should be displayed', function (done) {
      driver.get('http://localhost:5000/templates/prototypes/constituency.html');

      driver
        .findElements({ className: 'leaflet-container' })
        .then(function (res) {
          expect(!!res.length).to.be.true;
        });

      done();
    });

  });

});
