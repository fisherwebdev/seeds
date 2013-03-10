define(['config', 'backbone'], function () {


  var NavView = Backbone.View.extend({

    el: 'header',

    events: function () {
      var events = {};
      events[SEEDS_CONFIG.pointer.up + ' h1'] = 'navigate';
      events[SEEDS_CONFIG.pointer.up + ' li'] = 'navigate'; // e.g. 'touchend li' = 'navigate'
      return events;
    },

    initialize: function () {},

    navigate: function (e) {
      app.trigger('press');
      var view = $(e.currentTarget).data('view');
      if (view == "tweetlist" && $('header').hasClass('panel-1')) {
        app.trigger('refresh');
      }
      else {
        app.router.navigate(view, {trigger: true});
      }
    }

  });


  return NavView;
});