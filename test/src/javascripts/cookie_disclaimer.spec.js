var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  { expect } = chai,

  jsdom = require('jsdom'),
  { JSDOM } = jsdom,
  { document } = (new JSDOM('<div id="cookie"></div>')).window, // Write element to DOM

  helper = fs.readFileSync(process.cwd() + '/src/javascripts/_helpers.js'),
  code = fs.readFileSync(process.cwd() + '/src/javascripts/cookie_disclaimer.js');

describe('cookie_disclaimer.js', function () {

  beforeEach(function (done) {
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

  describe('function', function () {

    it('cookieBanner() should exist', function (done) {
      expect(UK_Parliament.cookieBanner).to.equal(UK_Parliament.cookieBanner);
      done();
    });

  });

  describe('cookieBanner()', function () {

    it('has set a class to display the cookie banner', function (done) {
      var element = document.getElementById('cookie');
      var attribute = element.getAttribute('class');
      var cls = attribute.split(' ').filter(function (val) {
        return val === 'show';
      });
      expect(cls).to.include('show');
      done();
    });

    it('has set a cookie', function (done) {
      let cookie = UK_Parliament.getCookie('UK_Parliament__seen_cookie_message');
      expect(cookie).to.equal('yes');
      done();
    });

  });

});
