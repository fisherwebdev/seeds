define(['config', 'backbone'], function () {


  var NavView = Backbone.View.extend({

    tagName: "ul",

    id: "seeds-primary-nav",

    className: "core",

    events: function () {
      var events = {};
      events[SEEDS_CONFIG.pointer.up + " li"] = "navigate";
      return events;
    },

    initialize: function () {
      this.render();
    },

    template: _.template($("#seeds-template-nav").html()),

    render: function () {
      this.$el.html(this.template());
      $('header .core').append(this.el);
      return this;
    },

    navigate: function (e) {
      var view = $(e.currentTarget).data('view');
      app.router.navigate(view, {trigger: true});
    }

  });


  return NavView;
});