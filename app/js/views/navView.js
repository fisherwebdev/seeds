define(['config', 'backbone'], function () {


  var NavView = Backbone.View.extend({

    tagName: 'ul',

    id: 'seeds-nav',

    className: 'core',

    events: function () {
      var events = {};
      events[SEEDS_CONFIG.pointer.up + ' li'] = 'navigate'; // e.g. 'touchend a' = 'navigate'
      return events;
    },

    initialize: function () {
      this.render();
    },

    template: _.template($("#seeds-template-nav").html()),

    render: function () {
      this.$el.append(this.template());
      this.attemptSvg();
      $('header .core').append(this.el);
      return this;
    },

    navigate: function (e) {
      var view = $(e.currentTarget).data('view');
      app.router.navigate(view, {trigger: true});
    },

    attemptSvg: function ($docFrag) {
      if ($('html').hasClass('svg')) {
        this.$el.find('div').css('backgroundImage', 'url(/app/img/inkwell.svg)');
      }
    }

  });


  return NavView;
});