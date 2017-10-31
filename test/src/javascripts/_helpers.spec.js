var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  { expect } = chai,

  jsdom = require('jsdom'),
  { JSDOM } = jsdom,
  { document } = (new JSDOM()).window,

  code = fs.readFileSync(process.cwd() + '/src/javascripts/_helpers.js');

describe('_helper.js', function() {

  beforeEach(function(done) {
    global.document = document;
    global.window = document.defaultView;
    global.XMLHttpRequest = window.XMLHttpRequest;

    vm.runInThisContext(code);

    done();
  });

  describe('function', function() {

    it('setCookie() should exist', function(done) {
      expect(UK_Parliament.setCookie).to.equal(UK_Parliament.setCookie);
      done();
    });

    it('getCookie() should exist', function(done) {
      expect(UK_Parliament.getCookie).to.equal(UK_Parliament.getCookie);
      done();
    });

    it('httpRequest() should exist', function(done) {
      expect(UK_Parliament.httpRequest).to.equal(UK_Parliament.httpRequest);
      done();
    });

  });

  describe('setCookie() and #getCookie()', function() {

    it('can set and get cookie', function(done) {
      UK_Parliament.setCookie('testCookieName', 'testCookieValue', 1);
      var cookie = UK_Parliament.getCookie('testCookieName');
      expect(cookie).to.equal('testCookieValue');
      done();
    });

  });

  describe('httpRequest()', function() {

    it('can make a request', function(done) {
      UK_Parliament.httpRequest('http://lda.data.parliament.uk/constituencies/146747.json', function(data) {
        let value =  data.result.primaryTopic.label._value;
        expect(value).to.equal('Aberavon');
      });
      done();
    });

  });

});
