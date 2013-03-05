define(['config', 'backbone'],
  function (config, Backbone) {


    var PanelView = Backbone.View.extend({

      initialize: function () {
        this.render().bringToFront();
      },

      render: function () {
        this.$el.append(this.template());
        app.$carousel.append(this.el);
        return this;
      },

      bringToFront: function () {
        app.carousel.rotate(this.$el.data('carousel-index'));
        return this;
      }

    });


    return PanelView;
  }
);