const {Builder} = require('selenium-webdriver');
const chrome = require('chromedriver');

module.exports = {
  /**
   * This function sets up the paths before selenium test is run.
   * It then tears down the set up for test to ensure resources and released
   *
   * @param url [string] The url to run our tests against
   */
  seleniumSetup: (url) => {
    let driver;
    this.driver = driver;

    /**
     * Using Chrome in headless mode
     * instead of a native headless browser so that we can:
     * visually debug issues when required
     * add/remove browser capabilities
     */
    before(async () => {
      this.driver = new Builder()
        .withCapabilities({
          'browserName': 'chrome',
          chromeOptions: {
            args: ['--headless']
          }
        })
        .build();
      await this.driver.get(url);
    });

    after(() => this.driver.quit());

    return this;
  }
}
