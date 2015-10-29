//var assert = require('assert'),
//test = require('selenium-webdriver/testing'),
//webdriver = require('selenium-webdriver');
//var driver;
//
//test.describe('tap|QA homepage', function() {
//  this.timeout(15000);
//
//    test.beforeEach(function() {
//      driver = new webdriver.Builder().
//        withCapabilities(webdriver.Capabilities.chrome()).
//        build();
//    });
//
//    test.afterEach(function() {
//      driver.quit();
//    });
//
//
//    test.it("Displays 'We test software.' in first header", function() {
//      driver.get('http://tapqa.com');
//      var title = driver.findElement(webdriver.By.xpath("//div[contains(@class, 'col-sm-8 col-sm-offset-2 text-center')]/h1"));
//      title.getAttribute('innerText').then(function(title) {
//        assert.equal(title, 'We test software.');
//      });
//    });
//
//    test.it("Displays 'What quality concerns keep you up at night?' in second header", function() {
//      driver.get('http://tapqa.com');
//      var title = driver.findElement(webdriver.By.xpath("//div[contains(@class, 'col-sm-8 col-sm-offset-2 text-center')]/h2"));
//      title.getAttribute('innerText').then(function(title) {
//        assert.equal(title, 'What quality concerns keep you up at night?')
//      });
//    });
//});
