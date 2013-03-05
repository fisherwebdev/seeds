define(['config', 'backbone', 'models/tweet'],
  function (config, Backbone, Tweet) {


    var TweetList = Backbone.Collection.extend({

      model: Tweet,

      url: function () {
        return SEEDS_CONFIG.api.base + '/tweets';
      },

      initialize: function () {
        this.fetch({
          error: this.handleInitError,
          xhrFields: {withCredentials: true} // for CORS with session data
        });
      },

      createTweet: function (text) {
        var handleTweetError = _.bind(this.handleTweetError, this),
            attributes = {
              "text": text,
              "user": {
                "profile_image_url": app.user.profile_image_url,
                "name": app.user.name,
                "screen_name": app.user.screen_name
              }
            },
            ajaxOptions = {
              success: this.handleTweetSuccess,
              error: handleTweetError,
              xhrFields: {withCredentials: true} // for CORS with session data
            }
        this.create(attributes, ajaxOptions);
      },

      handleInitError: function (collection, jqxhr, options) {
        app.trigger("ajax-error", jqxhr);
        console.log("tweetlist init error. maybe get stuff from local storage at this point?")
      },

      handleTweetSuccess: function () {
        app.trigger("tweet-success");  // CreateTweetView is listening for this so it can clear the text.
      },

      handleTweetError: function (model, jqxhr, options) {

        console.log(model);

        this.remove(model); // the Tweet view is listening for this removal and will remove itself from the DOM.

        // give the user another chance.  note that we also have not cleared the CreateTweet textarea yet.
        if (jqxhr.status !== 403) {
          var tryAgain = confirm("That last tweet didn't go through.  Try Again?");
          if (tryAgain) {
            this.createTweet(model.attributes.text);
          }
        }

        app.trigger("ajax-error", jqxhr); // handle the 403 error or perhaps others.  see AppView.
      }

    });


    return TweetList;
  }
);