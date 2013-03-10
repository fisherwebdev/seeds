define(['config', 'backbone', 'views/panelView'],
  function (config, Backbone, PanelView) {


    var CreateTweetView = PanelView.extend({ // PanelView provides the initialize, render and bringToFront methods

      el: $('.createtweet.panel'),

      template: _.template($("#seeds-template-createtweet").html()),

      events: function () {
        var events = {
          // Not only does Firefox not support keyup, but we want to handle copy-paste input too.
          'focus textarea': 'startValidationTimer',
          'blur textarea': 'clearValidationTimer',
          'keydown': 'postOnEnterKey'
        };
        //events[SEEDS_CONFIG.pointer.up + ' #seeds-tweet-button'] = 'postTweet'; // e.g. 'touchend .button' = 'postTweet'
        return events;
      },

      initialize: function () { // overriding PanelView

        // this is a last minute hack because i can't get this working on the iphone without it.  original commented out in events above.
        $(document).on('touchend', _.bind(function (e) {
          if (e.target.id == "seeds-tweet-button") {
            this.postTweet()
          }
        }, this));

        this.render()
            .listenTo(app, 'tweet-success', this.clearText);
        this.$textarea = this.$el.find('textarea');
        this.$countdown = this.$el.find('.countdown');
        this.bringToFront()
      },

      bringToFront: function () { // overriding PanelView to provide focus
        var index = this.$el.data('carousel-index');
        app.carousel.rotate(index);
        $('header').removeClass().addClass('panel-' + index);
        // this.$textarea.focus(); // this is giving me trouble with the animation on android.  is there a solution?
        return this;
      },

      postTweet: function () {
        if (this.$el.hasClass('disabled')) return;            // Do nothing if the character count is wrong.
        app.trigger('press');                                 // AppView listens for this.
        Backbone.emulateJSON = true;                          // CORS likes it to be form data, not json.
        setTimeout(_.bind((function () {                      // Firefox again, not able to keep up, likes to have this deferred.
          this.collection.createTweet(this.$textarea.val());  // tweetlist collection does the ajax and data work for creating the tweet.
        }), this), 1);
        app.router.navigate("tweetlist", {trigger: true});    // We're done here so switch views.
      },

      startValidationTimer: function (e) {
        this.timerId = setInterval(_.bind(this.validateCharCount, this), 100);
      },

      clearValidationTimer: function (e) {
        clearTimeout(this.timerId);
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

// TODO: some of this code might be able to be shared with authView, like the timer.