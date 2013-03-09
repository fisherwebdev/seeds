define(['config', 'backbone'], function () {


  var NavView = Backbone.View.extend({

    tagName: 'ul',

    id: 'seeds-nav',

    className: 'core',

    events: function () {
      var events = {};
      events[SEEDS_CONFIG.pointer.up + ' li'] = 'navigate'; // e.g. 'touchend li' = 'navigate'
      return events;
    },

    initialize: function () {
      this.render();
    },

    template: _.template($("#seeds-template-nav").html()),

    render: function () {
      this.$el.append(this.template());
      $('header .core').append(this.el);
      return this;
    },

    navigate: function (e) {
      app.trigger('press');
      var view = $(e.currentTarget).data('view');
      app.router.navigate(view, {trigger: true});
    }

  });


  return NavView;
});