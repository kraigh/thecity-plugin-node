thecity-plugin-node
===================

NPM module for decrypting the oauth data for The City iframe plugins.


##Installation##

```javascript
npm install thecity-plugin
```

##Usage##

Require the module, and then initialize an instance of TheCityPlugin with your app's oauth secret:

```javascript
var TheCityPlugin = require('thecity-plugin');
var thecity_plugin = new TheCityPlugin(CITY_APP_SECRET);
```

Then in your server, setup a POST route for The City to post the encrypted data to:

```javascript
var express = require('express');
var app = express();

app.use(express.bodyParser());

app.post('/iframe', function(req, res){
  thecity_plugin.decrypt_city_data(req.body.city_data, req.body.city_data_iv, function(err, city_oauth_data) {
    if (!err) {
      var oauth_token = city_oauth_data.oauth_token
      var user_id = city_oauth_data.user_id
      var account_id = city_oauth_data.account_id
      var subdomain = city_oauth_data.subdomain
      // ...

      res.send('Decrypted The City oauth data!');
    }
  });
});

app.listen(3000);

```
