define(['config', 'backbone', 'collections/tweetlist'], function () {

  var TweetListView = Backbone.View.extend({

    tagName: "ul",

    className: "tweetlist",

    initialize: function (type) {
      var type = type || 'home',
          collectionName = type + 'TweetList'; // e.g. homeTweetList

      this.index = app.mainViewList.indexOf(collectionName); // see config

      console.log('timeline view', type, collectionName);

      // Create the main timeline collection of tweets
      app.collections[collectionName] = new app.collections.TweetList(type);

      this.panelData = this.createPanelData(type);

      this.listenTo(app, 'navigate', this.navigate)

      this.listenTo(app.collections[collectionName], 'add', this.addOne);
      this.listenTo(app.collections[collectionName], 'reset', function () {
        this.addAll(collectionName);
      });
    },

    render: function () {
      this.panel = new app.views.Panel({coreView: this});
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
    },

    createPanelData: function (type) {
      var panelData = {};
      switch (type) {
        case "home":
          panelData.title = "Your Twitter Stream";
          break;
        case "mentions":
          panelData.title = "Tweets Mentioning You";
          break;
        case "user":
        case "me":
          panelData.title = "Your Tweets";
          break;
        default:
          panelData.title = type + " Timeline";
      }
      return panelData;
    }

  });

  app.views.TweetList = TweetListView;

  return TweetListView;

});