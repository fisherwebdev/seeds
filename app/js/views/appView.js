define(['config', 'backbone'], function () {

  var AppView = Backbone.View.extend({

    el: '#seeds-app',

    events: {
      'click #seeds-sign-in-button': 'authenticate'
    },

    initialize: function() {
      app.$stage = $("#seeds-stage"); // make the stage easily available to other views
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
    }


  });

  app.views.App = AppView;

  return AppView;

});