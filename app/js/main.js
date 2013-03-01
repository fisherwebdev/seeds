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
  'views/appView',
  'routers/router'

], function (config, AppView, Router) {

  // use our namespace as the primary event bus
  _.extend(app, Backbone.Events);

  // start the app
  app.views.app = app.views.app || new AppView;
  app.router = new Router;

  // Not using pushState due to maintaining total separation from server.
  // If we wanted to instead implement all of our routes on the server also, we could use pushState and avoid the #.
  Backbone.history.start();

});