define(['config', 'backbone'], function () {

  var User = Backbone.Model.extend({

    url: function () {
      return SEEDS_CONFIG.api.base + "/user/" + this.nickname
    },

    defaults: {
      id: null,
      id_str: null,
      name: null,
      screen_name: null,
      location: null,
      description: null,
      url: null,
      entities: null,
      protected: null,
      followers_count: null,
      friends_count: null,
      listed_count: null,
      created_at: null,
      favourites_count: null,
      utc_offset: null,
      time_zone: null,
      geo_enabled: null,
      verified: null,
      statuses_count: null,
      lang: null,
      status: null,
      contributors_enabled: null,
      is_translator: null,
      profile_background_color: null,
      profile_background_image_url: null,
      profile_background_image_url_https: null,
      profile_background_tile: null,
      profile_image_url: null,
      profile_image_url_https: null,
      profile_link_color: null,
      profile_sidebar_border_color: null,
      profile_sidebar_fill_color: null,
      profile_text_color: null,
      profile_use_background_image: null,
      default_profile: null,
      default_profile_image: null,
      following: null,
      follow_request_sent: null,
      notifications: null
    },

    initialize: function (options) {

      var options = options || {};

      this.nickname = options.nickname;
      this.fetch({
        xhrFields: {withCredentials: true} // for CORS with session data
      });
      console.log('User Model!');
    },

    parse: function (response, options) {
      return $.extend(response, {
        profile_image_url_original: response.profile_image_url.replace("_normal", "")
      });
    }

  });

  app.models.User = User;

  return User;
});