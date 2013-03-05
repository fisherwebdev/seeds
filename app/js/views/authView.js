define(['config', 'backbone'],
  function (config, Backbone) {


    var AuthView = Backbone.View.extend({

      el: $('.auth.panel'),

      template: _.template($("#seeds-template-auth").html()),

      events: {
        'click .button': 'authenticate',
        'keyup input': 'validateCharCount'
      },

      initialize: function () {
        this.render();
        this.$textfield = this.$el.find('input[type=text]');
        this.bringToFront();
      },

      render: function () {
        this.$el.append(this.template());
        app.$carousel.append(this.el);
        return this;
      },

      bringToFront: function () {
        app.$carousel.removeClass().addClass('auth-position');
        app.carousel.rotate(this.$el.data('carousel-index'));
      },

      authenticate: function () {
        if (this.$el.hasClass('disabled')) return;

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