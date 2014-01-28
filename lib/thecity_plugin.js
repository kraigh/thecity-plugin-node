var crypto = require('crypto');

var TheCityPlugin = function(city_app_secret) {
  if (city_app_secret == undefined) throw new Error('city_app_secret required');
  this.key = new Buffer(city_app_secret.substring(0,32));
}

TheCityPlugin.prototype.decrypt_city_data = function(encrypted_city_data, city_data_iv) {
    var data = new Buffer(encrypted_city_data, 'base64');
    var iv = new Buffer(city_data_iv, 'base64');
    var decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
    var decoded_data = decipher.update(data);
    return JSON.parse(decoded_data.toString('utf8'))
}

module.exports = TheCityPlugin;