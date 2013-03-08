define(['config', 'backbone', 'lib/carousel3D'], function (config, Backbone, Carousel3D) {


  var AppView = Backbone.View.extend({

    el: '#seeds-app',

    initialize: function() {
      this.listenTo(app, "ajax-error", this.handleAjaxError)
          .setUpCarousel();
    },

    setUpCarousel: function () {
      var $carousel = app.$carousel = $("#seeds-carousel"); // the panel containing element
      var carousel = app.carousel = new Carousel3D( $carousel.get(0) ); // the panel rotating object
      carousel.modify(); // setup
      carousel.ready();
    },

    handleAjaxError: function (jqxhr) {
      var response = (jqxhr && jqxhr.responseText && JSON.parse(jqxhr.responseText)) || {},
          error = response.error;
      if (error === "invalid session data") { // Known message returned from openseeds.io API.
        app.router.navigate("", {trigger: true});
      }
      else if (jqxhr && jqxhr.status === 403) { // If we are forbidden for another reason, CORS is probably to blame.
        alert("The server is forbidding you from using this application for an unknown reason.  Please try later.");
      }
    }

  });


  return AppView;
});