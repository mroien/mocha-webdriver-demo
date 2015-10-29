var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

var driver;
var homePage = 'http://www.tie3.ajc.com';

test.describe('Ad verification', function() {
    this.timeout(15000);

    test.before(function () {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();
    });

    test.after(function () {
        driver.quit();
    });

    //
    test.it('home page should load in a timely manner', function () {
        driver.get(homePage);
        driver.getTitle().then(function (title) {
            assert.equal(title, 'AJC.com: Atlanta News, Sports, Atlanta Weather, Business News | www.tie3.ajc.com');
        });
    });

    test.it('RP02 has a width of 300 and height of 100', function () {
        var RPO2 = driver.findElement(webdriver.By.id('google_ads_iframe_11347122/www.ajc.com-wired/online/home_9'));
        var height = RPO2.getAttribute('height').then(function (height) {
            assert.equal(height, 100);
        });
        var width = RPO2.getAttribute('width').then(function (width) {
            assert.equal(width, 300);
        });
    });

    test.it('RP03 has a width of 300 and height of 250', function () {
        var RP03 = driver.findElement(webdriver.By.id('google_ads_iframe_11347122/www.ajc.com-wired/online/home_11'));
        var height = RP03.getAttribute('height').then(function (height) {
            assert.equal(height, 250);
        });
        var width = RP03.getAttribute('width').then(function (width) {
            assert.equal(width, 300);
        });
    });

    test.it("HP AD has a valid width and height combination - '728x90', '950x30', '970x90'", function () {
        var testPassed = false;
        var dimensions = driver.findElement(webdriver.By.id('google_ads_iframe_11347122/www.ajc.com-wired/online/home_1'))
            .getSize().then(function(dimensions) {

                if (dimensions.width == 728 && dimensions.height == 90) {
                    testPassed = true;
                } else if (dimensions.width == 950 && dimensions.height == 30) {
                    testPassed = true;
                } else if (dimensions.width == 970 && dimensions.height == 90) {
                    testPassed = true;
                }

                assert.equal(testPassed, true,
                    'Expected dimensions did not match actual! Width: '+dimensions.width+' Height: '+dimensions.height);
            });
    });
});