define(['config', 'backbone', 'views/panelView'],
  function (config, Backbone, PanelView) {


    var CreateTweetView = PanelView.extend({ // PanelView provides the initialize, render and bringToFront methods

      el: $('.createtweet.panel'),

      template: _.template($("#seeds-template-createtweet").html()),

      events: {
        'click .button': 'postTweet',
        'keyup textarea': 'validateCharCount',
        'keydown': 'postOnEnterKey'
      },

      initialize: function () { // overriding PanelView
        this.render()
            .listenTo(app, 'tweet-success', this.clearText);
        this.$textarea = this.$el.find('textarea');
        this.$countdown = this.$el.find('.countdown');
        this.bringToFront()
      },

      bringToFront: function () { // overriding PanelView to provide focus
        app.carousel.rotate(this.$el.data('carousel-index'));
        // this.$textarea.focus(); // giving me trouble with the animation
        return this;
      },

      postTweet: function () {
        if (this.$el.hasClass('disabled')) return;          // Do nothing if the character count is wrong.
        Backbone.emulateJSON = true;                        // CORS likes it to be form data, not json.
        this.collection.createTweet(this.$textarea.val());  // tweetlist collection does the ajax and data work for creating the tweet.
        app.router.navigate("tweetlist", {trigger: true});  // We're done here so switch views.
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
      },

      postOnEnterKey: function (e) {
        if (e.which === 13) {
          e.preventDefault();
          this.postTweet();
        }
      },

      clearText: function () {
        this.$textarea.val("");
        this.showCharCount(0);
      }

    });


    return CreateTweetView;
  }
);