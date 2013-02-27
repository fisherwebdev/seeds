require.config({
  paths: {
    "jquery":   "vendor/jquery/jquery",
    "lodash":   "vendor/lodash/lodash",
    "json2":    "vendor/json2/json2",
    "backbone": "vendor/backbone-amd/backbone"
  }
});

require([

  'config',
  'lib/polyfills',
  'models/tweet',
  'models/user',
  'collections/tweetlist',
  'views/app',
  'views/tweetlist',
  'views/tweet',
  'views/user',
  'routers/router'

], function () {

  app.views.seedsApp = app.views.seedsApp || new app.views.App;
  // console.log(app.views.seedsApp);

});