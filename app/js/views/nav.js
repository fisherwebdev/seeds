define(['config', 'backbone'], function () {

  var NavView = Backbone.View.extend({

    tagName: "ul",

    id: "seeds-primary-nav",

    events: {
      "click li": "slidePanel"
    },

    initialize: function () {
      console.log("Nav!")
      this.render();
    },

    template: _.template($("#seeds-template-nav").html()),

    render: function () {
      this.$el.html(this.template());
      app.views.seedsApp.$el.prepend(this.el);
      return this;
    },

    slidePanel: function (e) {
      var $button = $(e.currentTarget),
          data = {
            view: $button.data('view')
          }

      app.trigger("slidePanel", data);

      //console.log($button, arguments);
    }

  });

  app.views.Nav = NavView;

  return NavView;

});