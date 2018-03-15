var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  { expect } = chai,

  jsdom = require('jsdom'),
  { JSDOM } = jsdom,
  { document } = (new JSDOM('<body class="has-js"><noscript></noscript></body>')).window, // Write element to DOM

  helper = fs.readFileSync(process.cwd() + '/src/javascripts/_helpers.js'),
  code = fs.readFileSync(process.cwd() + '/src/javascripts/noscript_aria_tags.js');

describe('noscript_aria_tags.js', function () {

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

    it('nsAria() should exist', function (done) {
      expect(UK_Parliament.nsAria).to.equal(UK_Parliament.nsAria);
      done();
    });

  });

  describe('nsAria()', function () {

    it('should add aria-hidden="true" attribute', function (done) {
      var element = document.getElementsByTagName('noscript')[0];
      var attribute = element.getAttribute('aria-hidden');
      expect(attribute).to.include('true');
      done();
    });

  });

});
