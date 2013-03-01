define(['config', 'backbone', 'models/tweet'],
  function (config, Backbone, Tweet) {


    var TweetList = Backbone.Collection.extend({

      model: Tweet,

      url: function () {
        return SEEDS_CONFIG.api.base + "/timeline/home";
      },

      initialize: function () {
        this.fetch({
          xhrFields: {withCredentials: true} // for CORS with session data
        });
      }

    });


    return TweetList;
  }
);