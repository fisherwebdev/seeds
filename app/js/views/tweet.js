define(['config', 'backbone'], function () {

  var TweetView = Backbone.View.extend({

    tagName: "li",

    className: "tweet",

    initialize: function () {
      console.log('tweet view');
      this.listenTo(this.model, "change", this.render);
    },

    template: _.template($("#seeds-template-tweet").html()),

    render: function () {
      // console.log(this.model.attributes)
      this.$el.html(this.template(this.model.attributes));
      return this;
    }

  });

  app.views.Tweet = TweetView;

  return TweetView;

});