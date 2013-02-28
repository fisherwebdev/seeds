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
  'views/panel',
  'views/tweetlist',
  'views/tweet',
  'views/user',
  'views/nav',
  'routers/router'

], function () {

  // the primary event bus
  _.extend(app, Backbone.Events);

  // start the app
  app.views.seedsApp = app.views.seedsApp || new app.views.App;
  app.seedsRouter = new app.SeedsRouter;

  // Not using pushState due to maintaining total separation from server.
  // If we wanted to instead implement all of our routes on the server also, we could use pushState and avoid the #.
  Backbone.history.start();

});