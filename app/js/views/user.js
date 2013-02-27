define(['config', 'backbone'], function () {

  var UserView = Backbone.View.extend({

    className: "user profile",

    initialize: function () {
      console.log('user view', this.model);
      this.listenTo(this.model, 'change', this.render);
    },

    template: _.template($("#seeds-template-user").html()),

    render: function () {
      console.log(this.model.attributes);

      this.$el.html(this.template(this.model.attributes));
      app.views.seedsApp.$el.append(this.el);
      return this;
    }

  });

  app.views.User = UserView;

  return UserView;

});