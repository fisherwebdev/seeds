define(['config', 'backbone', 'models/tweet'],
  function (config, Backbone, Tweet) {


    var CreateTweetView = Backbone.View.extend({

      el: $('.createtweet.panel'),

      template: _.template($("#seeds-template-createtweet").html()),

      events: {
        'click .button': 'postTweet',
        'keyup textarea': 'validateCharCount',
        'keydown': 'postOnEnterKey'
      },

      initialize: function () {
        this.render();
        this.$textarea = this.$el.find('textarea');
        this.$countdown = this.$el.find('.countdown');
        this.bringToFront();
        this.listenTo(app, 'tweet-success', this.clearText);
      },

      render: function () {
        this.$el.append(this.template());
        app.$carousel.append(this.el);
        return this;
      },

      bringToFront: function () {
        app.$carousel.addClass('createtweet-position'); // TODO: get rid of this stuff
        app.carousel.rotate(this.$el.data('carousel-index'));
        this.$textarea.focus();
      },

      postTweet: function () {
        if (this.$el.hasClass('disabled')) return;                    // Do nothing if the character count is wrong.
        Backbone.emulateJSON = true;                                  // CORS likes it to be form data, not json.
        app.collections.tweetlist.createTweet(this.$textarea.val());  // tweetlist collection does the ajax and data work for creating the tweet.
        app.router.navigate("tweetlist", {trigger: true});            // We're done here so switch views.
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