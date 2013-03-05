define(['config', 'backbone', 'views/panelView'],
  function (config, Backbone, PanelView) {


    var AuthView = PanelView.extend({ // PanelView provides the initialize, render and bringToFront methods

      el: $('.auth.panel'),

      template: _.template($("#seeds-template-auth").html()),

      events: {
        'click .button': 'authenticate',
        'keyup input': 'validateCharCount'
      },

      initialize: function () { // overriding PanelView
        this.render();
        this.$textfield = this.$el.find('input[type=text]').focus();
        this.bringToFront();
      },

      authenticate: function () {
        if (this.$el.hasClass('disabled')) return; // Do nothing if the text field has nothing in it.

        // Build the encoded redirect url to pass to the server out of the current location and the configuration file
        var nicknameKey = encodeURIComponent(this.$textfield.val()),
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

      validateCharCount: function (e) {
        count = this.$textfield.val().length;
        if (count < 1) {
          this.$el.addClass('disabled');
        }
        else {
          this.$el.removeClass('disabled');
        }
      }

    });


    return AuthView;
  }
);