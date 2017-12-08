var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  { expect } = chai,

  jsdom = require('jsdom'),
  { JSDOM } = jsdom,
  { document } = (new JSDOM('<div id="cookie"></div>')).window,

  helper = fs.readFileSync(process.cwd() + '/src/javascripts/_helpers.js'),
  code = fs.readFileSync(process.cwd() + '/src/javascripts/cookie_disclaimer.js');

describe('cookie_disclaimer.js', function() {

  beforeEach(function(done) {
    global.document = document;
    global.window = document.defaultView;

    vm.runInThisContext(helper);
    vm.runInThisContext(code);

    done();
  });

  describe('function', function() {

    it('cookieBanner() should exist', function(done) {
      expect(UK_Parliament.cookieBanner).to.equal(UK_Parliament.cookieBanner);
      done();
    });

  });

  describe('cookieBanner()', function() {

    it('has been set', function(done) {
      let cookie = UK_Parliament.getCookie('UK_Parliament__seen_cookie_message');
      expect(cookie).to.equal('yes');
      done();
    });

  });

});

