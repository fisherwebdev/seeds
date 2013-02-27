define(['config', 'backbone'], function () {

  var TweetListView = Backbone.View.extend({

    tagName: "ul",

    className: "tweetlist",

    initialize: function (type) {
      var type = type || 'home',
          collectionName = type.charAt(0).toUpperCase() + type.slice(1) + 'TweetList'; // e.g. HomeTweetList

      console.log('timeline view', type, collectionName);

      // Create the main timeline collection of tweets
      app.collections[collectionName] = new app.collections.TweetList(type);

      this.listenTo(app.collections[collectionName], 'add', this.addOne);
      this.listenTo(app.collections[collectionName], 'reset', function () {
        this.addAll(collectionName);
      });
    },

    render: function () {
      app.views.seedsApp.$el.html(this.el);
      return this;
    },

    // Add a single tweet to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(tweet) {
      var view = new app.views.Tweet({model: tweet});
      this.$el.append(view.render().el);
    },

    // Add all items in the TweetList collection at once.
    addAll: function(collectionName) {
      this.$el.html('');
      var docFrag = document.createDocumentFragment();
      app.collections[collectionName].each(function (tweet) {
        var view = new app.views.Tweet({model: tweet});
        $(docFrag).append(view.render().el);
      }, this);
      this.$el.append(docFrag);
    }

  });

  app.views.TweetList = TweetListView;

  return TweetListView;

});