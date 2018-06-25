var
  test = require('selenium-webdriver/testing'),
  { Builder, until } = require('selenium-webdriver'),

  { expect } = require('chai'),

  chrome = require('chromedriver'),

  driver;


describe('toggles', function() {

  // setup, this is run before all tests
  test.before(function (done) {
    /**
     * Using Chrome in headless mode
     * instead of a native headless browser so that we can:
     * visually debug issues when required
     * add/remove browser capabilities
     */
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

  // teardown, this is run after all tests
  test.after(function (done) {
    driver.quit(); // quit the browser
    done();
  });

  test.it('should add class "open"', function(done) {

    driver.executeScript('return UK_Parliament.toggleClass(document.querySelector(\'[data-toggle="item"]\'), \'open\');');

    driver
      .wait(until.elementLocated({ css: 'div[data-toggle="item"]' }))
      .getAttribute('class')
      .then(function(string) {
        var temp = string.split(' ').filter(function(val) {
          return val === 'open';
        });
        expect(temp).to.include('open');
      });

    done();

  });

  test.it('should remove class "open"', function(done) {

    driver.executeScript('return UK_Parliament.toggleClass(document.querySelector(\'[data-toggle="item"]\'), \'open\');');

    driver
      .wait(until.elementLocated({ css: 'div[data-toggle="item"]' }))
      .getAttribute('class')
      .then(function(string) {
        var temp = string.split(' ').filter(function(val) {
          return val === 'open';
        });
        expect(temp).to.not.include('open');
      });

    done();

  });

});
