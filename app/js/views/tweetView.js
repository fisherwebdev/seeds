define(['config', 'backbone'],
  function () {


    var TweetView = Backbone.View.extend({

      tagName: "li",

      className: "tweet",

      initialize: function () {
        this.listenTo(this.model, "change", this.render);
      },

      template: _.template($("#seeds-template-tweet").html()),

      render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
      }

    });


  return TweetView;
  }
);