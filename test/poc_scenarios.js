var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    tie3 = require('../pom/tie3');

var driver;

test.describe('Ad verification', function() {
    this.timeout(30000);

    test.before(function () {
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();
    });

    test.after(function () {
        driver.quit();
    });

    test.it('home page loads', function () {
        driver.get(tie3.homePage());
        driver.getTitle().then(function (title) {
            assert.equal(title, tie3.homePageTitle());
        });
    });

    test.it("RP02 is '300x100'", function () {
        var testPassed = false;
        var RPO2 = driver.findElement(webdriver.By.id(tie3.RP02())).getSize()
            .then(function(dimensions) {
                if (dimensions.width == 300 && dimensions.height == 100) {
                    testPassed = true;
                }
                assert.equal(testPassed, true,
                    'Expected dimensions did not match actual - Width: '+dimensions.width+' Height: '+dimensions.height);
            });
    });

    test.it("RP03 has valid dimensions of - '300x250', '600x160', or '302x250'", function () {
        var testPassed = false;
        var RP03 = driver.findElement(webdriver.By.id(tie3.RP03())).getSize()
            .then(function(dimensions) {
                if (dimensions.width == 300 && dimensions.height == 250) {
                    testPassed = true;
                } else if (dimensions.width == 600 && dimensions.height == 160) {
                    testPassed = true;
                } else if (dimensions.width == 302 && dimensions.height == 250) {
                    testPassed = true;
                }
                assert.equal(testPassed, true,
                    'Expected dimensions did not match actual - Width: '+dimensions.width+' Height: '+dimensions.height);
            });
    });

    test.it("HP AD has valid dimensions of - '728x90', '950x30', or '970x90'", function () {
        var testPassed = false;
        var dimensions = driver.findElement(webdriver.By.id(tie3.HP_AD()))
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

    test.it('Rotator has 4 slots', function() {
        var rotator = driver.findElements(webdriver.By.className(tie3.rotator()))
            .then(function(rotator) {
                assert.equal(rotator.length, 4);
            });
    });

    test.it('Rotator has ad NPR04 in 4th slot', function() {
        var NPR04 = driver.findElement(webdriver.By.id(tie3.NPR04()))
            .getText().then(function(NPR04) {
                assert.equal(NPR04.split("\n")[0], 'SPONSORED');
            });
    });

    test.it("SWB has valid dimensions of '300x250'", function() {
        var testPassed = false;
        var dimensions = driver.findElement(webdriver.By.id(tie3.SWB()))
            .getSize().then(function(dimensions) {
                if (dimensions.width == 300 && dimensions.height == 250) {
                    testPassed = true;
                }
                assert.equal(testPassed, true, "SWB was sized width: "+dimensions.width+" Height: "+dimensions.height);
            });
    });

    test.it('SWB is only showing in odd rows', function() {
        var rows = driver.findElement(webdriver.By.className(tie3.rows()))
            .then(function() {
                var temp = driver.findElements(webdriver.By.className(tie3.storyCard()))
                    .then(function(temp) {
                        assert.equal(temp.length, 1);
                    });
            });
    });
});