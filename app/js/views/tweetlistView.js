define(['config', 'backbone', 'collections/tweetlist', 'views/tweetView'],
  function (config, Backbone, TweetList, TweetView) {


    var TweetListView = Backbone.View.extend({

      el: $(".tweetlist.panel"),

      className: "tweetlist panel",

      initialize: function () {
        this.render();
        this.listenTo(this.collection, 'add', this.handleAdd);
        this.listenTo(this.collection, 'reset', this.handleReset);
      },

      render: function () {
        app.$stage.append(this.el);
        this.bringToStage();
        return this;
      },

      appendModel: function(tweet, $docFrag) {
        var view = new TweetView({model: tweet});
        $container = $docFrag || this.$el;
        $container.append(view.render().el);
      },

      handleAdd: function (tweet) {
        var view = new TweetView({model: tweet});
        this.$el.prepend(view.render().el);
      },

      handleReset: function() {
        var $docFrag = $(document.createDocumentFragment());
        this.collection.each(function (tweet) {
          this.appendModel(tweet, $docFrag);
        }, this);
        this.$el.html($docFrag);
      },

      bringToStage: function () {
        app.$stage.removeClass().addClass("tweetlist-position");
        app.carousel.rotate(this.$el.data('carousel-index'));
      }

    });


    return TweetListView;
  }
);