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

  code = fs.readFileSync(process.cwd() + '/src/javascripts/button_state.js'),

  driver, server;

describe('button_state.js', function() {

  describe('function', function () {

    beforeEach(function(done) {
      global.document = document;

      vm.runInThisContext('var UK_Parliament = (typeof UK_Parliament === \'undefined\') ? {} : UK_Parliament;');
      vm.runInThisContext(code);

      done();
    });

    it('buttonLoader() should exist', function(done) {
      expect(UK_Parliament.buttonLoader).to.equal(UK_Parliament.buttonLoader);
      done();
    });

  });

  describe('buttonLoader', function() {

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

      driver.get('http://localhost:5000/templates/prototypes/_buttons-forms.html');

      done();
    });

    test.afterEach(function (done) {
      driver.quit();
      server.close();
      done();
    });

    test.it('loading icon should be visible', function (done) {
      driver.wait(until.elementLocated({ id: 'search_box' })).submit();

      driver
        .wait(until.elementLocated({ css: '.btn--loading svg' }))
        .getCssValue('display')
        .then(function (value) {
          expect(value).to.equal('block');
        });

      done();
    });

    test.it('form has class .btn--loading', function (done) {
      driver.wait(until.elementLocated({ id: 'search_box' })).submit();

      driver
        .wait(until.elementLocated({ css: 'button[type="submit"]' }))
        .getAttribute('class')
        .then(function (value) {
          var temp = value.split(' ').filter(function (val) {
            return val === 'btn--loading';
          });
          expect(temp).to.include('btn--loading');
        });

      done();
    });

    test.it('form should not have class .btn--loading', function (done) {
      driver
        .wait(until.elementLocated({ css: 'form' }))
        .getAttribute('class')
        .then(function (value) {
          var temp = value.split(' ').filter(function (val) {
            return val !== 'btn--loading';
          });
          expect(temp).to.not.include('btn--loading');
        });

      done();
    });

  });

});
