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
        this.tweetCollectionRoute("tweetList", TweetListView);
      },

      createtweet: function () {
        this.tweetCollectionRoute("createTweet", CreateTweetView);

      },


      // supporting methods

      tweetCollectionRoute: function (viewName, viewClass) {
        this.ensureChrome();
        this.ensureUser();
        var tweetList = app.collections.tweetlist = app.collections.tweetlist || new TweetList;
        this.bringViewToFront(viewName, viewClass, {collection: tweetList});
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
          app.views[viewName] = new viewClass(options); // e.g. app.views.tweetList = new TweetListView({collection: tweetlist});
        }
        else {
          app.views[viewName].bringToFront();
        }
      }

    });


    return Router;
  }
);