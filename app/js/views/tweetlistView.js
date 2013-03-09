define(['config', 'backbone', 'collections/tweetlist', 'views/panelView', 'views/tweetView'],
  function (config, Backbone, TweetList, PanelView, TweetView) {


    var TweetListView = PanelView.extend({ // PanelView provides the initialize, render and bringToFront methods

      el: $(".tweetlist.panel"),

      className: "tweetlist panel",

      initialize: function () { // overriding PanelView
        this.render()
            .bringToFront()
            .listenTo(this.collection, 'add', this.handleAdd)
            .listenTo(this.collection, 'reset', this.handleReset);
        if (!this.$el.children().length) {
          this.handleReset();
        }
      },

      render: function () { // overriding PanelView
        app.$carousel.append(this.el);
        return this;
      },

      appendModel: function(tweet, $docFrag) {  // $docFrag is optional
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
      }

    });


    return TweetListView;
  }
);