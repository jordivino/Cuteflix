Cuteflix.Models.Video = Backbone.Model.extend({
  urlRoot: "/api/videos",
  
  parse: function(response) {
    if (response.tags) {
      this.tags().set(response.tags, {parse: true});
      delete response.tags;
    }
    return response
  },
  
  tags: function() {
    if (!this._tags) {
      this._tags = new Cuteflix.Collections.Tags();
    }
    return this._tags
  }, 
  
  isInMyList: function() {
    return Cuteflix.myListVideos.indexOf(this) !== -1;
  }
  
  
});