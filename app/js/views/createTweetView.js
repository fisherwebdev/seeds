define(['config', 'backbone'],
  function (config, Backbone) {


    var CreateTweetView = Backbone.View.extend({

      className: "createtweet panel",

      template: _.template($("#seeds-template-createtweet").html()),

      events: {
        'click button': 'postTweet',
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
        app.$stage.addClass("flipped");
      },

      postTweet: function () {
        if (this.$el.hasClass('too-long')) return;
        console.log('post tweet');
      },

      validateCharCount: function (e) {
        count = this.$textarea.val().length;
        if (count > 140) {
          this.$el.addClass('too-long');
        }
        else {
          this.$el.removeClass('too-long');
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