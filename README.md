thecity-plugin-node
===================

NPM module for decrypting the oauth data for The City iframe plugins.


##Installation##

npm install thecity-plugin

##Usage##

```
var TheCityPlugin = require('thecity-plugin');
var thecity_plugin = new TheCityPlugin(CITY_APP_SECRET);
var city_oauth_data = thecity_plugin.decrypt_city_data(req.body.city_data, req.body.city_data_iv);
```
