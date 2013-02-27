define(['config', 'backbone'], function () {

  //window.app = window.app || {};

  var Workspace = Backbone.Router.extend({
    routes:{
      'timeline': 'timeline',
      'timeline/:type': 'timeline',
      'user/:nickname': 'user'

    },

    initialize: function () {
      console.log('Router!');
    },

    timeline: function (type) {
      $("#seeds-sign-in").remove();
      app.views.seedsApp = app.views.seedsApp || new app.views.App;

      var type = type || 'home';
      app.views.homeTimeline = new app.views.TweetList(type);
      app.views.homeTimeline.render();
    },

    user: function (nickname) {
      $("#seeds-sign-in").remove();
      app.views.seedsApp = app.views.seedsApp || new app.views.App;

      var user = new app.models.User({nickname: nickname});
      app.models.users[nickname] = user;

      app.views.users[nickname] = new app.views.User({model: user});
    }

  });

  app.SeedsRouter = new Workspace();

  // Not using pushState due to maintaining total separation from server.
  // If we wanted to instead implement all of our routes on the server also, we could use pushState and avoid the #.
  Backbone.history.start();

  return app.SeedsRouter;
})