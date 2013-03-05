define(['config', 'backbone'],
  function () {


    var TweetView = Backbone.View.extend({

      tagName: "li",

      className: "tweet",

      initialize: function () {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model.collection, "remove", this.handleRemove);
      },

      template: _.template($("#seeds-template-tweet").html()),

      render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
      },

      handleRemove: function (model)  {
        if (model === this.model) {
          this.remove();
        }
      }

    });


  return TweetView;
  }
);