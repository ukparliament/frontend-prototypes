var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  {expect} = chai,

  test = require('selenium-webdriver/testing'),
  webdriver = require('selenium-webdriver'),
  {Builder, until} = webdriver,
  chrome = require('chromedriver'),

  jsdom = require('jsdom'),
  {JSDOM} = jsdom,
  {document} = (new JSDOM()).window,

  helper = fs.readFileSync(process.cwd() + '/src/javascripts/_helpers.js'),
  code = fs.readFileSync(process.cwd() + '/src/javascripts/dropdown.js'),

  cls, driver;

describe('dropdown.js', function() {

  describe('function', function() {

    beforeEach(function(done) {
      /**
       * Mock the DOM
       */
      global.document = document;

      /**
       * Execute our code
       * and it's dependencies
       */
      vm.runInThisContext(helper);
      vm.runInThisContext(code);

      done();
    });

    it('dropdownToggle() should exist', function(done) {
      expect(UK_Parliament.dropdownToggle).to.equal(UK_Parliament.dropdownToggle);
      done();
    });

  });

  describe('dropdownToggle()', function() {

    // this.timeout(30000);

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

    test.it('.dropdown has class .open', function(done) {
      driver.wait(until.elementLocated({css: '.dropdown__toggle > h2 > a'})).click();

      driver
        .wait(until.elementLocated({css: '.dropdown'}))
        .getAttribute('class')
        .then(function(value) {
          cls = value.split(' ').filter(function(val) {
            return val === 'open';
          });
          expect(cls).to.include('open');
        });

      done();
    });

    test.it('.dropdown should not contain class .open', function(done) {
      driver
        .wait(until.elementLocated({css: '.dropdown'}))
        .getAttribute('class')
        .then(function(value) {
          cls = value.split(' ').filter(function(val) {
            return val !== 'open';
          });
          expect(cls).to.not.include('open');
        });

      done();
    });

    test.it('dropdown__content should be displayed', function(done) {
      driver.wait(until.elementLocated({css: '.dropdown__toggle > h2 > a'})).click();

      driver
        .wait(until.elementLocated({css: '.open > .dropdown__content'}))
        .getCssValue('visibility')
        .then(function(value) {
          expect(value).to.equal('visible');
        });

      done();
    });

    test.it('dropdown__content should not be displayed', function(done) {
      driver
        .wait(until.elementLocated({css: '.dropdown > .dropdown__content'}))
        .getCssValue('visibility')
        .then(function(value) {
          expect(value).to.equal('hidden');
        });

      done();
    });

  });

});
