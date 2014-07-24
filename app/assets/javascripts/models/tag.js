Cuteflix.Models.Tag = Backbone.Model.extend({
  urlRoot: "/api/tags",
  
  parse: function(response) {
    if (response.videos) {
      this.videos().set(response.videos, {parse: true});
      delete response.videos;
    }
    return response
  },
  
  videos: function() {
    if (!this._videos) {
      this._videos = new Cuteflix.Collections.Videos();
    }
    return this._videos
  }
})