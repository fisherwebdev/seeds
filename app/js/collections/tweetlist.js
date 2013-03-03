define(['config', 'backbone', 'models/tweet'],
  function (config, Backbone, Tweet) {


    var TweetList = Backbone.Collection.extend({

      model: Tweet,

      url: function () {
        return SEEDS_CONFIG.api.base + '/tweets';
      },

      initialize: function () {
        this.fetch({
          success: function () {
            console.log("tweetlist success", arguments);
          },
          error: function (collection, jqxhr, options) {
            app.trigger("ajax-error", jqxhr.status, JSON.parse(jqxhr.responseText));
          },
          xhrFields: {withCredentials: true} // for CORS with session data
        });
      }

    });


    return TweetList;
  }
);