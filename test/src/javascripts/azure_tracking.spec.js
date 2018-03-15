var
  fs = require('fs'),
  vm = require('vm'),

  chai = require('chai'),
  {expect} = chai,

  jsdom = require('jsdom'),
  {JSDOM} = jsdom,
  {document} = (new JSDOM()).window,

  helper = fs.readFileSync(process.cwd() + '/src/javascripts/_helpers.js'),
  code = fs.readFileSync(process.cwd() + '/src/javascripts/azure_tracking.js');

describe('azure_tracking.js', function() {

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

    it('azureTracking() should exist', function(done) {
      expect(UK_Parliament.azureTracking).to.equal(UK_Parliament.azureTracking);
      done();
    });

  });

});
