const testHelper = require(process.cwd() + '/test/helpers/test-helper');
const {until} = require('selenium-webdriver');
const {expect} = require('chai');

describe('toggle()', () => {
  let seleniumSetup = testHelper.seleniumSetup('http://localhost:5000/templates/prototypes/_toggles.html');

  it('should add class "open"', async () => {
    await seleniumSetup.driver.executeScript('return UK_Parliament.toggleClass(document.querySelector(\'[data-toggle="item"]\'), \'open\');');

    await seleniumSetup.driver
      .wait(until.elementLocated({ css: '[data-toggle="item"]' }))
      .getAttribute('class')
      .then(function(string) {
        var temp = string.split(' ').filter(function(val) {
          return val === 'open';
        });
        expect(temp).to.include('open');
      });
  });

  it('should remove class "open"', async () => {
    await seleniumSetup.driver.executeScript('return UK_Parliament.toggleClass(document.querySelector(\'[data-toggle="item"]\'), \'open\');');

    await seleniumSetup.driver
      .wait(until.elementLocated({ css: '[data-toggle="item"]' }))
      .getAttribute('class')
      .then(function(string) {
        var temp = string.split(' ').filter(function(val) {
          return val === 'open';
        });
        expect(temp).to.not.include('open');
      });
  });
});
