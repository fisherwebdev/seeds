define(['config', 'backbone', 'collections/tweetlist', 'views/tweetView'],
  function (config, Backbone, TweetList, TweetView) {


    var TweetListView = Backbone.View.extend({

      tagName: "ul",

      className: "tweetlist panel",

      initialize: function () {
        this.render();
        this.listenTo(this.collection, 'add', this.addModel);
        this.listenTo(this.collection, 'reset', this.resetCollection);
      },

      render: function () {
        app.$stage.append(this.el);

        // rotate app to show this view.  see styles.css.
        $(app.views.app).removeClass('show-createtweet');

        return this;
      },

      addModel: function(tweet, $docFrag) {
        var view = new TweetView({model: tweet});
        $container = $docFrag || this.$el.find('ul');

        $container.append(view.render().el);
      },

      resetCollection: function() {
        var $docFrag = $(document.createDocumentFragment());
        this.collection.each(function (tweet) {
          this.addModel(tweet, $docFrag);
        }, this);
        this.$el.html($docFrag);
      },

      updateCollection: function () {

      },

      bringToStage: function () {
        app.$stage.removeClass("flipped");
      }

    });


    return TweetListView;
  }
);