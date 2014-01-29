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
    decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
    decoded_data = decipher.update(data, 'binary', 'utf8');
    decoded_data += decipher.final('utf8');
  
    try{
      parsed_data = JSON.parse(decoded_data);
    }
    catch(e) {
      err = e;
    }

    if (cb) {
      cb(err, parsed_data);
    } else {
      if (!err) {
        return parsed_data
      } else {
        return err
      }
    }

}

module.exports = TheCityPlugin;