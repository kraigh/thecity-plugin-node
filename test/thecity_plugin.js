var mocha = require('mocha'),
    should = require('should'),
    TheCityPlugin = require('../index'),
    thecity_plugin

describe('TheCityPlugin', function(){

  it("should require a key to create an instance", function() {
    (function(){
      new TheCityPlugin();
    }).should.throw();
  });

  beforeEach(function() {
    thecity_plugin = new TheCityPlugin('9c8672957afc914675c854d45a56f8badea97ea0693569a37a0ecd578117384d');
  });

  it("should have a key", function() {
    thecity_plugin.should.have.property('key');
  });

  it("should store key as a Buffer", function() {
    thecity_plugin.key.should.be.a.Buffer;
  });

  it("should truncate key to 32 characters", function() {
    thecity_plugin.key.toString('utf8').length.should.equal(32);
  });

  describe('#decrypt_city_data', function(done) {
    var encrypted_data = "RR3N6T7LvYYSFZJssM5_poLhtEzGd0pjaQcqSx7LmmXxh0kXH_FuyN4rzOrOtB3g6hBgW5JJdex4hUZfrMozx6YfT3GGe07Fvv0igd5mrw4L1iJBP8DmV1y--hY-EXFv9XoZUuEE_46f8cnTpG7aLDxMhx80dwGD6e9xossCnkhyGDtIn7dK1KQFTOm2WxTWZ3OrIYXX3bPLb_P_9uUfFmzw_eDknyFFEyPc09X-YydMcNVjd6LvWY5hF4VuPo1t83chomiUjpiS2eWcaapc3r-qSLZtEqplzSUnA3jI1EcH1GqMH7N-oZ-kRatogeBR65QTIGFdwFp7mDMyGzle6pGUlhavefZxZryVoOoHJO6IFvvOEPT3unH3EBsuXRb2"
    var iv = "0DkSwPXp2ggNXV52tiTDdw=="

    it("should be able to decrypt data", function(done){
      thecity_plugin.decrypt_city_data(encrypted_data, iv, function(err, data) {
        should.not.exist(err);
        data.should.have.property('oauth_token');
        data.oauth_token.should.equal("87c6f850f4e8ba11bd6b04b918380925cf6f6e34f888163a3835dc2080d0060d");
        done();
      }); 
    });

    it("should err on bad input", function(done){
      var encrypted_data = "RR3N6T7LvYYSFZJssM5_poLhtEzGd0pjaQcqSx7LmmXxh0kXH_FuyN4rzOrOtB3g6hBgW5JJdex4hUZfrMozx6YfT3GGe07Fvv0igd5mrw4L1iJBP8DmV1y--hY-EXFv9XoZUuEE_46f8cnTpG7aLDxMhx80dwGD6e9xossCnkhyGDtIn7dK1KQFTOm2WxTWZ3OrIYXX3bPLb_P_9uUfFmzw_eDknyFFEyPc09X-YydMcNVjd6LvWY5hF4VuPo1t83chomiUjpiS2eWcaapc3r-qSLZtEqplzSUnA3jI1EcH1GqMH7N-oZ-kRatogeBR65QTIGFdwFp7mDMyGzle6pGUlhavefZxZryVoOoHJO6IFvvOEPT3unH"
      thecity_plugin.decrypt_city_data(encrypted_data, iv, function(err, data) {
        should.not.exist(data);
        should.exist(err);
        done();
      }); 
    });

    it("should be able to be called sync", function() {
      var data = thecity_plugin.decrypt_city_data(encrypted_data, iv);
      data.oauth_token.should.equal("87c6f850f4e8ba11bd6b04b918380925cf6f6e34f888163a3835dc2080d0060d");
    });

    it("should throw when called sync with bad input", function() {
      (function(){
        var encrypted_data = "RR3N6T7LvYYSFZJssM5_poLhtEzGd0pjaQcqSx7LmmXxh0kXH_FuyN4rzOrOtB3g6hBgW"
        thecity_plugin.decrypt_city_data(encrypted_data, iv);
      }).should.throw();
    });

  });
});