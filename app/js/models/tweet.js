define(['config', 'backbone'], function () {


  var Tweet = Backbone.Model.extend({

    initialize: function () {
      this.createLinks();
    },

    createLinks: function () {
      var text = this.get('text'),
          entities = this.get('entities'),
          urls = (entities && entities.urls);

      // regex is very slow, so we'll concatenate if the model has Twitter API url objects to support it.
      text = urls && urls.length ? this.createLinksFromIndices(text, urls) : this.createLinksFromRegex(text);
      this.set('text', text);
    },

    createLinksFromIndices: function (text, urls) {
      _.each(urls, function (urlObject) {
        var url = urlObject.url,
            indices = urlObject.indices,
            start = text.substr(0, indices[0]),
            end = text.substr(indices[1], text.length);
        text = start + "<a href='" + url + "' target='_blank'>" + url + "</a>" + end;
      });
      return text;
    },

    createLinksFromRegex: function (text) {
      var regex = /(https?:\/\/[^\s]*)/g,
        template = "<a href='$1' target='_blank'>$1</a>";
      return text.replace(regex, template);
    }

  });


  return Tweet;
});