define(['config', 'backbone'], function () {


  var NavView = Backbone.View.extend({

    tagName: 'ul',

    id: 'seeds-nav',

    className: 'core',

    events: function () {
      var events = {};
      events[SEEDS_CONFIG.pointer.up + ' a'] = 'navigate'; // e.g. 'touchend a' = 'navigate'
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
      e.preventDefault();
      var view = $(e.currentTarget).data('view');
      app.router.navigate(view, {trigger: true});
    }

  });


  return NavView;
});