define(['config', 'backbone'], function () {

  var Workspace = Backbone.Router.extend({
    routes:{
      '/': 'landing',
      'timeline': 'timeline',
      'timeline/:type': 'timeline',
      'timeline/user/:nickname': 'timeline',
      'me': 'user', // TODO: build for this
      'user/:nickname': 'user'
    },

    initialize: function () {
      console.log('Router!');
    },

    landing: function () {
      // TODO: perhaps redirect here is user is logged in?
    },

    timeline: function (type, nickname) {
      this.ensureAppChrome();

      if (type == "user") {
        // TODO
      }
      else {
        var type = type || 'home',
          timelineViewName = type + "Timeline";

        if (!app.views[timelineViewName]) {
          app.views[timelineViewName] = new app.views.TweetList(type);
          app.views[timelineViewName].render();
        }
        else {
          console.log("TODO: bring the app.views[timelineViewName] into view!")
        }
      }
    },

    user: function (nickname) {
      this.ensureAppChrome();

      if (!app.views.users[nickname]) {
        var user = new app.models.User({nickname: nickname});
        app.models.users[nickname] = user;
        app.views.users[nickname] = new app.views.User({model: user});
      }
      else {
        console.log("TODO: bring the app.views.user[nickname] into view!")
      }
    },

    ensureAppChrome: function () {
      if (!app.views.nav) {
        $("#seeds-sign-in").remove();
        app.views.nav = new app.views.Nav;
      }
    }

  });

  app.SeedsRouter = Workspace;

  return app.SeedsRouter;
})