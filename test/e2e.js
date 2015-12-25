import webdriver from 'selenium-webdriver';
import { expect } from 'chai';
import electronPath from 'electron-prebuilt';

describe('main window', function spec() {
  before((done) => {
    this.timeout(5000);
    this.driver = new webdriver.Builder()
      .usingServer('http://localhost:9515')
      .withCapabilities({
        chromeOptions: {
          binary: electronPath,
          args: [ 'app=.' ]
        }
      })
      .forBrowser('electron')
      .build();
    done();
  });

  after(async () => {
    this.timeout(10000);
    await this.driver.quit();
  });
});
