define(['config', 'backbone', 'models/tweet'],
  function (config, Backbone, Tweet) {


    var CreateTweetView = Backbone.View.extend({

      el: $('.createtweet.panel'),

      template: _.template($("#seeds-template-createtweet").html()),

      events: {
        'click .button': 'postTweet',
        'keyup textarea': 'validateCharCount'
      },

      initialize: function () {
        this.render();
        this.$textarea = this.$el.find('textarea');
        this.$countdown = this.$el.find('.countdown');
        this.$charsLeft = this.$el.find('.chars-left');
      },

      render: function () {
        this.$el.append(this.template());
        app.$stage.append(this.el);
        this.bringToStage();
        return this;
      },

      bringToStage: function () {
        app.$stage.addClass('createtweet-position');
        app.carousel.rotate(this.$el.data('carousel-index'));
      },

      postTweet: function () {
        if (this.$el.hasClass('disabled')) return;

        Backbone.emulateJSON = true;
        app.collections.tweetlist.create(
          { // attributes
              "text": this.$textarea.val(),
              "user": {
                "profile_image_url": app.user.profile_image_url,
                "name": app.user.name,
                "screen_name": app.user.screen_name
              }
          },
          { // ajax options
            success: function () {
              console.log("tweeted successfully", arguments);
            },
            error: function () {
              console.log("error while tweeting", arguments);
            },
            xhrFields: {withCredentials: true} // for CORS with session data
          }
        );
      },

      validateCharCount: function (e) {
        count = this.$textarea.val().length;
        if (count > 140) {
          this.$el.addClass('disabled too-long');
        }
        else if (count < 1) {
          this.$el.addClass('disabled');
        }
        else {
          this.$el.removeClass('disabled too-long');
        }
        this.showCharCount(count);
      },

      showCharCount: function (count) {
        this.$countdown.text(140 - count);
      }

    });


    return CreateTweetView;
  }
);