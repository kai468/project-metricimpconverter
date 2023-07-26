const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    test('Test GET with valid input', function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=10L')
            .end( (req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}');
                done();
            });
    });
    test('Test GET with invalid unit', function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end( (req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '"invalid unit"');
                done();
            });
    });
    
    test('Test GET with invalid number (double fraction)', function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kg')
            .end( (req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '"invalid number"');
                done();
            });
    });
    test('Test GET with invalid number and unit', function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end( (req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '"invalid number and unit"');
                done();
            });
    });
    test('Test GET with no number input, valid unit input', function(done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=kg')
            .end( (req, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}');
                done();
            });
    });
    
});
