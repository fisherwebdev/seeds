define([
    'backbone',
    'collections/tweetList',
    'models/currentUser',
    'views/authView',
    'views/tweetListView',
    'views/createTweetView',
    'views/navView'
  ],
  function (Backbone, TweetList, CurrentUser, AuthView, TweetListView, CreateTweetView, NavView) {


    var Router = Backbone.Router.extend({

      routes:{
        '': 'auth',
        'tweetlist': 'tweetlist',
        'createtweet': 'createtweet'
      },

      auth: function () {
        this.bringViewToFront("authView", AuthView);
      },

      tweetlist: function () {
        this.ensureApp();

        var tweetList = app.collections.tweetlist = app.collections.tweetlist || new TweetList,
            tweetListView = app.views.tweetList; // may be undefined

        this.bringViewToFront("tweetList", TweetListView, {collection: tweetList})
      },

      createtweet: function () {
        this.ensureApp();

        if (!app.collections.tweetlist) {
          this.navigate('tweetlist', {trigger: true});
          return;
        }

        this.bringViewToFront("createTweet", CreateTweetView);
      },

      ensureApp: function () {
        this.ensureChrome();
        this.ensureUser();
      },

      ensureChrome: function () {
        if (!app.views.nav) {
          $("#seeds-sign-in").remove();
          app.views.nav = new NavView;
        }
      },

      ensureUser: function () {
        if (!app.user) {
          app.user = JSON.parse(localStorage.getItem('user'));
          if (!app.user) {
            new CurrentUser;
          }
        }
      },

      bringViewToFront: function (viewName, viewClass, options) {
        if (!app.views[viewName]) {
          app.views[viewName] = new viewClass(options);
        }
        else {
          app.views[viewName].bringToFront();
        }
      }

    });


    return Router;
  }
);