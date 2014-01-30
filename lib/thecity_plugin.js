var crypto = require('crypto');

var TheCityPlugin = function(city_app_secret) {
  if (city_app_secret == undefined) throw new Error('city_app_secret required');
  this.key = new Buffer(city_app_secret.substring(0,32));
}

TheCityPlugin.prototype.decrypt_city_data = function(encrypted_city_data, city_data_iv, cb) {
    var data
      , iv
      , decipher
      , decoded_data
      , parsed_data
      , err

    data = new Buffer(encrypted_city_data, 'base64');
    iv = new Buffer(city_data_iv, 'base64');

    try{
      decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
      decoded_data = decipher.update(data, 'binary', 'utf8');
      decoded_data += decipher.final('utf8');
  
      parsed_data = JSON.parse(decoded_data);
    }
    catch(e) {
      err = e;
    }
    if (!cb && err) throw new Error('something bad happened trying to decrypt the oauth data'); 
    return (!cb) ? parsed_data : cb(err, parsed_data);

}

module.exports = TheCityPlugin;