define(['config', 'backbone', 'lib/carousel3D'], function (config, Backbone, Carousel3D) {


  var AppView = Backbone.View.extend({

    el: '#seeds-app',

    events: {
      'click #seeds-sign-in-button': 'authenticate'
    },

    initialize: function() {
      var $carousel = app.$carousel = $("#seeds-carousel"); // the panel containing element
      var carousel = app.carousel = new Carousel3D( $carousel.get(0) ); // the panel rotating object
      carousel.modify();
      this.listenTo(app, "session-error", this.handleSessionError)
    },

    authenticate: function (e) {
      // Build the encoded redirect url to pass to the server out of the current location and the configuration file
      var nicknameKey = encodeURIComponent($('#seeds-nickname-key').val()),
          url =  window.location.href;
      if (url[url.length - 1] !== "/") url += "/";
      url += SEEDS_CONFIG.authRedirectPath;
      url = encodeURIComponent(url);

      // Redirect and include the query string required by the server.
      // After authentication, the server will use these query parameters
      // to redirect the user back to the url we've specified in the config file.
      // Note that the screen_name parameter serves two purposes:
      // 1. as a key for storing the redirect url
      // 2. forces the twitter OAuth to prepopulate the login screen with the username.
      window.location = (SEEDS_CONFIG.api.auth + "?screen_name=" + nicknameKey + "&url=" + url);
    },

    handleSessionError: function () {
      app.router.navigate("", {trigger: true})
    }

  });


  return AppView;
});