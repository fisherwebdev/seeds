define(['config', 'backbone'], function () {


  var Tweet = Backbone.Model.extend({

    initialize: function () {
      // console.log('Tweet Model!', this);
    }

  });


  return Tweet;
});