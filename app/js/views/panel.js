define(['config', 'backbone'], function () {

  var PanelView = Backbone.View.extend({

    className: "panel",

    initialize: function (options) {
      var options = options || {};
      this.coreView = options.coreView;
      console.log("Panel!");



      this.render(options.coreView);
    },

    template: _.template($("#seeds-template-panel").html()),

    render: function (coreView) {
      this.$el.html(this.template(coreView.panelData)).append(coreView.el);
      app.views.seedsApp.$el.append(this.el);
      return this;
    }

  });

  app.views.Panel = PanelView;

  return PanelView;

});