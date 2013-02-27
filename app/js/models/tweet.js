define(['config', 'backbone'], function () {

  var Tweet = Backbone.Model.extend({

    defaults: {
      created_at: '',
      id: -1,
      id_str: '',
      text: '',
      source: '',
      truncated: '',
      in_reply_to_status_id: '',
      in_reply_to_status_id_str: '',
      in_reply_to_user_id: '',
      in_reply_to_user_id_str: '',
      in_reply_to_screen_name: '',
      user: {},
      geo: null,
      coordinates: null,
      place: null,
      contributors: null,
      retweet_count: -1,
      entities: {},
      favorited: false,
      retweeted: false,
      possibly_sensitive: false
    },

    initialize: function () {
      console.log('Tweet Model!');
    }

  });

  app.models.Tweet = Tweet;

  return Tweet;
});