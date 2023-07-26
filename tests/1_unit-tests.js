const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();


suite('Unit Tests', function(){
    suite('Input Reading and Validation', function(){
        test('read a whole number input', function() {
            assert.equal(convertHandler.getNum("3lbs"), 3);
        });
        test('read a decimal number input', function() {
            assert.equal(convertHandler.getNum("3.25lbs"), 3.25);
        });
        test('read a fractional input', function() {
            assert.equal(convertHandler.getNum("1/2lbs"), 0.5);
        });
        test('read a fractional input with a decimal', function() {
            assert.equal(convertHandler.getNum("4.2/2lbs"), 2.1);
        });
        test('return an error on a double-fraction (i.e. 3/2/3)', function() {
            assert.equal(convertHandler.getNum("4/2/1lbs"), "error");
        });
        test('default to a numerical input of 1 when no numerical input is provided', function() {
            assert.equal(convertHandler.getNum("lbs"), 1);
        });
        test('read each valid input unit', function() {
            assert.equal(convertHandler.getUnit("1lbs"), "lbs");
            assert.equal(convertHandler.getUnit("1gal"), "gal");
            assert.equal(convertHandler.getUnit("1L"), "l");
            assert.equal(convertHandler.getUnit("1kg"), "kg");
            assert.equal(convertHandler.getUnit("1mi"), "mi");
            assert.equal(convertHandler.getUnit("1km"), "km");
        });
        test('return an error for an invalid input unit', function() {
            assert.equal(convertHandler.getUnit("1lxs"), "error");
            assert.equal(convertHandler.getUnit("1a"), "error");
            assert.equal(convertHandler.getUnit("1lbsa"), "error");
            assert.equal(convertHandler.getUnit("1albs"), "error");
        });
    });

    suite('Conversion', function() {
        test('convert gal to L', function() {
            assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 1/10000);
        });
        test('convert L to gal', function() {
            assert.approximately(convertHandler.convert(1, "l"), 0.26417, 1/10000);
        });
        test('convert mi to km', function() {
            assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 1/10000);
        });
        test('convert km to mi', function() {
            assert.approximately(convertHandler.convert(2, "km"), 1.24275, 1/10000);
        });
        test('convert lbs to kg', function() {
            assert.approximately(convertHandler.convert(1, "lbs"), 0.453592, 1/10000);
        });
        test('convert kg to lbs', function() {
            assert.approximately(convertHandler.convert(0.453592, "kg"), 1, 1/10000);
        });
    });

    suite('Output formatting', function() {
        test('return correct return unit', function() {
            assert.equal(convertHandler.getReturnUnit("gal"), "l");
            assert.equal(convertHandler.getReturnUnit("l"), "gal");
            assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
            assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
            assert.equal(convertHandler.getReturnUnit("mi"), "km");
            assert.equal(convertHandler.getReturnUnit("km"), "mi");
        });
        test('return spelled-out string', function() {
            assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
            assert.equal(convertHandler.spellOutUnit("l"), "liters");
            assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
            assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
            assert.equal(convertHandler.spellOutUnit("mi"), "miles");
            assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
        });
        test('getObject', function() {
            const expected = {
                initNum: 0.2,
                initUnit: "kg",
                returnNum: 0.44092,
                returnUnit: "lbs",
                string: "0.2 kilograms converts to 0.44092 pounds"
            };
            assert.deepEqual(convertHandler.getObject("1.6/8KG"), expected);
        });
    });

});