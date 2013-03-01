define(['backbone', 'collections/tweetList', 'views/tweetListView', 'views/createTweetView', 'views/navView'],
  function (Backbone, TweetList, TweetListView, CreateTweetView, NavView) {


    var Router = Backbone.Router.extend({

      routes:{
        'tweetlist': 'tweetlist',
        'createtweet': 'createtweet'
      },

      tweetlist: function () {
        this.ensureAppChrome();

        var tweetList = app.collections.tweetlist = app.collections.tweetlist || new TweetList,
            tweetListView = app.views.tweetList;

        if (!tweetListView) {
          app.views.tweetList = new TweetListView({collection: tweetList});
        }
        else {
          tweetListView.bringToStage();
        }
      },

      createtweet: function () {
        this.ensureAppChrome();

        var createTweetView = app.views.createTweet;

        if (!createTweetView) {
          app.views.createTweet = new CreateTweetView();
        }
        else {
          createTweetView.bringToStage();
        }
      },

      ensureAppChrome: function () {
        if (!app.views.nav) {
          $("#seeds-sign-in").remove();
          app.views.nav = new NavView;
        }
      }

    });


    return Router;
  }
);