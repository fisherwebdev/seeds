define(['config', 'backbone', 'models/tweet'],
  function (config, Backbone, Tweet) {


    var TweetList = Backbone.Collection.extend({

      model: Tweet,

      url: function () {
        return SEEDS_CONFIG.api.base + '/tweets';
      },

      initialize: function () {
        this.listenTo(app, 'refresh', _.bind(this.handleRefresh, this));
        this.fetch({
          xhrFields: {withCredentials: true}, // for CORS with session data
          success: this.setLocally,
          error: _.bind(this.handleInitError, this)
        });
      },

      initWithLocals: function () {
        var locals = this.getLocally();
        if (locals) {
          this.add(locals); // initialize with the stored tweets instead
        }
      },

      createTweet: function (text) {
        var attributes = {
              "text": text,
              "user": {
                "profile_image_url": app.user.profile_image_url,
                "name": app.user.name,
                "screen_name": app.user.screen_name
              }
            },
            options = {
              success: this.handleTweetSuccess,
              error: _.bind(this.handleTweetError, this),
              xhrFields: {withCredentials: true} // for CORS with session data
            };
        this.create(attributes, options);
      },

      getLocally: function () {
        return JSON.parse(localStorage.getItem('tweetlist'));
      },

      setLocally: function (collection, response, jqxhr) {
        localStorage.setItem('tweetlist', JSON.stringify(collection));
      },

      triggerError: function (jqxhr) {
        app.trigger("ajax-error", jqxhr); // handle the 403 error or perhaps others.  see AppView.
      },

      handleRefresh: function () {
        this.fetch({
          xhrFields: {withCredentials: true}, // for CORS with session data
          success: this.setLocally,
          error: _.bind(this.handleAjaxError, this),
          update: true,
          remove: false
        });
      },

      handleInitError: function (collection, jqxhr) {
        this.initWithLocals();
        this.triggerError(jqxhr);
      },

      handleTweetSuccess: function () {
        app.trigger("tweet-success");  // CreateTweetView is listening for this so it can clear the text.
      },

      handleTweetError: function (model, jqxhr) {
        this.remove(model); // the Tweet view is listening for this removal and will remove itself from the DOM.
        if (jqxhr.status !== 403) {
          var tryAgain = confirm("That last tweet didn't go through.  Try Again?"); // give the user another chance.
          if (tryAgain) {
            this.createTweet(model.get('text'));
          }
        }
        this.triggerError(jqxhr);
      },

      handleAjaxError: function (collection, jqxhr) {
        this.triggerError(jqxhr);
      }

    });


    return TweetList;
  }
);