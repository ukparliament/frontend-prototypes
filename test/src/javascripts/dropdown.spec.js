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

  code = fs.readFileSync(process.cwd() + '/src/javascripts/dropdown.js'),

  driver, server;

describe('dropdown.js', function () {

  describe('function', function () {

    beforeEach(function (done) {
      global.document = document;

      vm.runInThisContext('var UK_Parliament = (typeof UK_Parliament === \'undefined\') ? {} : UK_Parliament;');
      vm.runInThisContext(code);

      done();
    });

    it('dropdownToggle() should exist', function (done) {
      expect(UK_Parliament.dropdownToggle).to.equal(UK_Parliament.dropdownToggle);
      done();
    });

  });

  describe('dropdownToggle', function () {

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

      driver.get('http://localhost:5000/templates/prototypes/_toggles.html');

      done();
    });

    test.afterEach(function (done) {
      driver.quit();
      server.close();
      done();
    });

    test.it('.dropdown has class .open', function (done) {
      driver.wait(until.elementLocated({ css: '.dropdown__toggle > h2 > a' })).click();

      driver
        .wait(until.elementLocated({ css: '.dropdown' }))
        .getAttribute('class')
        .then(function (value) {
          var temp = value.split(' ').filter(function (val) {
            return val === 'open';
          });
          expect(temp).to.include('open');
        });

      done();
    });

    test.it('.dropdown should not contain class .open', function (done) {
      driver
        .wait(until.elementLocated({ css: '.dropdown' }))
        .getAttribute('class')
        .then(function (value) {
          var temp = value.split(' ').filter(function (val) {
            return val !== 'open';
          });
          expect(temp).to.not.include('open');
        });

      done();
    });

    test.it('dropdown__content should be displayed', function (done) {
      driver.wait(until.elementLocated({ css: '.dropdown__toggle > h2 > a' })).click();

      driver
        .wait(until.elementLocated({ css: '.open > .dropdown__content' }))
        .getCssValue('visibility')
        .then(function (value) {
          expect(value).to.equal('visible');
        });

      done();
    });

    test.it('dropdown__content should not be displayed', function (done) {
      driver
        .wait(until.elementLocated({ css: '.dropdown > .dropdown__content' }))
        .getCssValue('visibility')
        .then(function (value) {
          expect(value).to.equal('hidden');
        });

      done();
    });

  });

});
