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
        var index = this.$el.data('carousel-index');
        app.carousel.rotate(index);
        $('header').removeClass().addClass('panel-' + index);
        return this;
      }

    });


    return PanelView;
  }
);