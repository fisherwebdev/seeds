define(['config', 'backbone'], function () {

  var TweetList = Backbone.Collection.extend({

    model: app.models.Tweet,

    url: function () {
      return SEEDS_CONFIG.api.base + "/timeline/" + this.type;
    },

    initialize: function (type) {

      if (type == "me") type = "user";

      // the timeline type should be one of: home, mentions, user
      this.type = type || 'home';

      this.fetch({
        xhrFields: {withCredentials: true} // for CORS with session data
      });

      console.log('TweetList Collection!', this);
    }

  });

  app.collections.TweetList = TweetList;

  return TweetList;
})