define(['config', 'backbone', 'views/panelView'],
  function (config, Backbone, PanelView) {


    var AuthView = PanelView.extend({ // PanelView provides the initialize, render and bringToFront methods

      el: $('.auth.panel'),

      template: _.template($("#seeds-template-auth").html()),

      events: function () {
        var events = {
          // Not only does Firefox not support keyup, but we want to handle copy-paste input too.
          'focus input': 'startValidationTimer',
          'blur input': 'clearValidationTimer',
          'keydown': 'postOnEnterKey'
        };
        events[SEEDS_CONFIG.pointer.up + ' .button'] = 'authenticate'; // e.g. 'touchend .button' = 'authenticate'
        return events;
      },

      initialize: function () { // overriding PanelView
        this.render();
        this.bringToFront();
        setTimeout(_.bind((function () { // setTimeout helps the timer start after the page is ready
          this.$textfield = this.$el.find('input[type=text]').focus();
        }), this), 1);

      },

      authenticate: function () {
        if (this.$el.hasClass('disabled')) return; // Do nothing if the text field has nothing in it.
        app.trigger('press'); // AppView listens for this.

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

      startValidationTimer: function (e) {
        this.timerId = setInterval(_.bind(this.validateCharCount, this), 1000);
      },

      clearValidationTimer: function (e) {
        clearTimeout(this.timerId);
      },

      validateCharCount: function () {
        count = this.$textfield.val().length;
        if (count < 1) {
          this.$el.addClass('disabled');
        }
        else {
          this.$el.removeClass('disabled');
        }
      },

      postOnEnterKey: function (e) {
        if (e.which === 13) {
          e.preventDefault();
          this.authenticate();
        }
      }

    });


    return AuthView;
  }
);