var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

var driver;
var homePage = 'http://www.tie3.ajc.com';

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
        driver.get(homePage);
        driver.getTitle().then(function (title) {
            assert.equal(title, 'AJC.com: Atlanta News, Sports, Atlanta Weather, Business News | www.tie3.ajc.com');
        });
    });

    test.it("RP02 is '300x100'", function () {
        var RPO2 = driver.findElement(webdriver.By.id('google_ads_iframe_11347122/www.ajc.com-wired/online/home_9'));
        var height = RPO2.getAttribute('height').then(function (height) {
            assert.equal(height, 100);
        });
        var width = RPO2.getAttribute('width').then(function (width) {
            assert.equal(width, 300);
        });
    });

    // @todo: update with combinations - update to dimensions then verification
    test.it("RP03 has valid dimensions of - '300x250', '600x160', or '302x250'", function () {
        var RP03 = driver.findElement(webdriver.By.id('google_ads_iframe_11347122/www.ajc.com-wired/online/home_11'));
        var height = RP03.getAttribute('height').then(function (height) {
            assert.equal(height, 250);
        });
        var width = RP03.getAttribute('width').then(function (width) {
            assert.equal(width, 300);
        });
    });

    test.it("HP AD has valid dimensions of - '728x90', '950x30', or '970x90'", function () {
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

    test.it('Rotator has 4 slots', function() {
        var rotator = driver.findElements(webdriver.By.className("cm-media-rotator-nav"))
            .then(function(rotator) {
                assert.equal(rotator.length, 4);
            });
    });

    test.it('Rotator has ad NPR04 in 4th slot', function() {
        var NPR04 = driver.findElement(webdriver.By.id('cm-ad-block-npr04'))
            .getText().then(function(NPR04) {
                assert.equal(NPR04.split("\n")[0], 'SPONSORED');
            });
    });

    test.it("SWB has valid dimensions of '300x250'", function() {
        var testPassed = false;
        var dimensions = driver.findElement(webdriver.By.id('google_ads_iframe_11347122/www.ajc.com-wired/online/home_19'))
            .getSize().then(function(dimensions) {
                var height = dimensions.height;
                var width = dimensions.width;

                if (height == 250 && width == 300) {
                    testPassed = true;
                }
                assert.equal(testPassed, true, "SWB was sized width: "+width+" Height: "+height);
            });
    });

    // @todo: needs to test a single occurence - assert doesn't work
    test.it("SWB is only showing in odd rows", function() {
        var rows = driver.findElement(webdriver.By.className('jscroll-inner'))
            .then(function(rows) {
                if (!rows.isElementPresent({className: 'cm-storycard-ad'})) {
                    assert.fail("SWB not present!");
                }
                // row assertion not working
                console.log("Rows: "+rows.length);
                assert.equal(rows.length, 1, "SWB occured more than once!");
        });
    });

    test.it('Rotator rotates in < 60 seconds', function() {
        //driver.findElements(webdriver.By.className('.cm-slid-active_0, .cm-slide-active_1, .cm-slide-active_2, .cm-slide-active_3, .cm-slide-active_4'))
        //    .then(function(el) {})
        function fetchActive() {
            driver.findElements(webdriver.By.className('.cm-slid-active_0, .cm-slide-active_1, .cm-slide-active_2, .cm-slide-active_3, .cm-slide-active_4'))
                .then(function(el) {
                    return el;
                });
        }
        var e1 = fetchActive();
        var e2 = setTimeout(fetchActive(), 20000);
        assert.notEqual(e1, e2, 'Rotator did not rotate fast enought!');
    });

    //it('verify that Rotator rotates (<60 seconds)', function() {
    //    function fetchActive() {
    //        return driver.complexFind(".cm-slide-active_0, .cm-slide-active_1, .cm-slide-active_2, .cm-slide-active_3, .cm-slide-active_4").then(function(el) {
    //            return el;
    //        });
    //    }
    //    var e1 = fetchActive();
    //    var e2 = setTimeout(fetchActive(), 20000);
    //    e1.should.not.equal(e2);
    //});
});