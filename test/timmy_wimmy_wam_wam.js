///**
// * Created by mroien on 10/26/15.
// */
//
//var wd = require('wd'),
//    chai = require('chai'),
//    chaiAsPromised = require('chai-as-promised');
//
//
//chai.use(chaiAsPromised);
//chai.should();
//
//// enables chai assertion chaining
//
//chaiAsPromised.transferPromiseness = wd.transferPromiseness;
//
//var driver = wd.promiseChainRemote(),
//    asserters = wd.asserters,
//    explicit_wait = require('../settings').explicit_wait,
//    settings = require('../settings'),
//    minutes = require('../utils/bits').minutes,
//    seconds = require('../utils/bits').seconds;
//
//require('../logging/logging').configure(driver);
//
//var homePage = "http://www.tie3.ajc.com"
//
//describe('WD.js ad verification', function () {
//    this.timeout(0);
//    this.slow(minutes(5));
//
//    before(function () {
//        this.timeout(15000);
//        return driver.init({browserName:'chrome'});
//    });
//
//    // beforeEach(function () {
//
//
//    // });
//
//    after(function () {
//        return driver.quit();
//    });
//
//    it('should be on the home page', function () {
//        return driver.get(homePage)
//            .title().should.eventually.become("AJC.com: Atlanta News, Sports, Atlanta Weather, Business News | www.tie3.ajc.com");
//    });
//    it ('should have RP02 have a width of 300 and height of 100', function(){
//
//        return driver
//            .elementById('google_ads_iframe_11347122/www.ajc.com-wired/online/home_9').getAttribute('height')
//            .should.eventually.equal('100', "The height of RP02 is not 100px").then(function(){
//                return driver
//                    .elementById('google_ads_iframe_11347122/www.ajc.com-wired/online/home_9').getAttribute('width')
//                    .should.eventually.equal('300', "The width of RP02 is not 300px")
//            });
//    });
//
//    it('should have RP03 have a width of 300 and height of 250', function () {
//
//        return driver
//            .elementById('google_ads_iframe_11347122/www.ajc.com-wired/online/home_11').getAttribute('height')
//            .should.eventually.equal('250', "The height of RP03 is not 250px").then(function(){
//                return driver
//                    .elementById('google_ads_iframe_11347122/www.ajc.com-wired/online/home_11').getAttribute('width')
//                    .should.eventually.equal('300', "The width of RP03 is not 300px");
//            })
//    });
//    it('should have a HP ad with a valid with and height combination', function () {
//        var testPass = false;
//        var dimension = driver.elementById('google_ads_iframe_11347122/www.ajc.com-wired/online/home_1')
//            .getSize();
//        if (dimension == {"width": 970, "hCode": 62080, "class": "org.openqa.selenium.Dimension", "height": 90}) {
//            console.log('HP had a width of 970px and a height of 90px');
//            testPass = true;
//        } else if (dimension == {
//                "width": 950,
//                "hCode": 972800,
//                "class": "org.openqa.selenium.Dimension",
//                "height": 30
//            }) {
//            console.log('HP had a width of 950px and a height of 30px');
//            testPass = true;
//        } else if (dimension == {
//                "width": 728,
//                "hCode": 46592,
//                "class": "org.openqa.selenium.Dimension",
//                "height": 90
//            }) {
//            console.log('HP had a width of 728px and a height of 30px')
//        }
//    });
//
//        // testPass.should.eventually.become(true);
//        return dimension;
//});
//
