define(['config', 'backbone', 'models/tweet'],
  function (config, Backbone, Tweet) {


    var TweetList = Backbone.Collection.extend({

      model: Tweet,

      url: function () {
        return SEEDS_CONFIG.api.base + '/tweets';
      },

      initialize: function () {
        var handleError = _.bind(this.handleInitError, this);
        this.fetch({
          success: this.setLocally,
          error: handleError,
          xhrFields: {withCredentials: true} // for CORS with session data
        });
      },

      createTweet: function (text) {
        var handleError = _.bind(this.handleTweetError, this),
            attributes = {
              "text": text,
              "user": {
                "profile_image_url": app.user.profile_image_url,
                "name": app.user.name,
                "screen_name": app.user.screen_name
              }
            },
            options = {
              success: this.handleTweetSuccess,
              error: handleError,
              xhrFields: {withCredentials: true} // for CORS with session data
            }
        this.create(attributes, options);
      },

      updateTweets: function () {
        var handleError = _.bind(this.handleUpdateError, this);
        this.update({
          remove: false,
          success: this.setLocally,
          error: handleError,
          xhrFields: {withCredentials: true} // for CORS with session data
        });
      },

      getLocally: function () {
        return JSON.parse(localStorage.getItem('tweetlist'));
      },

      setLocally: function (collection, response, jqxhr) {
        localStorage.setItem('tweetlist', JSON.stringify(collection));
      },

      handleInitError: function (collection, jqxhr, options) {
        var locals = this.getLocally();
        console.log("tweetlist ajax error.  got locals", locals);
        if (locals) {
          this.add(locals); // initialize with the stored tweets instead
        }
        app.trigger("ajax-error", jqxhr);
      },

      handleTweetSuccess: function (model, response, jqxhr) {
        app.trigger("tweet-success");  // CreateTweetView is listening for this so it can clear the text.
      },

      handleTweetError: function (model, jqxhr, options) {
        this.remove(model); // the Tweet view is listening for this removal and will remove itself from the DOM.

        if (jqxhr.status !== 403) {
          var tryAgain = confirm("That last tweet didn't go through.  Try Again?"); // give the user another chance.
          if (tryAgain) {
            this.createTweet(model.attributes.text);
          }
        }

        app.trigger("ajax-error", jqxhr); // handle the 403 error or perhaps others.  see AppView.
      },

      handleUpdateError: function (collection, jqxhr, options) {
        app.trigger("ajax-error", jqxhr);
      }

    });


    return TweetList;
  }
);