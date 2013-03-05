define(['config', 'backbone'], function () {


  var CurrentUser = Backbone.Model.extend({

    url: function () {
      return SEEDS_CONFIG.api.base + '/users/me';
    },

    initialize: function () {
      this.fetch({
        xhrFields: {withCredentials: true}, // for CORS with session data
        success: this.storeDataLocally,
        error: this.handleAjaxError
      });
    },

    storeDataLocally: function (model, response, jqxhr) {
      console.log(response);

      localStorage.setItem('user', JSON.stringify(response));
      app.user = response;
    },

    handleAjaxError: function () {
      console.log(arguments);
    }

  });


  return CurrentUser;
});