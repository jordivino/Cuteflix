Cuteflix.Collections.Videos = Backbone.Collection.extend({
  
  url: "/api/videos",
  
  model: Cuteflix.Models.Video,
  
  getOrFetch: function(id) {
    var videos = this; 
    var video = videos.get(id);
    if (video) {
      video.fetch();
    } else {
      video = new Cuteflix.Models.Video({
        id: id
      });
      video.fetch({
        success: function() {
          videos.add(video);
        }
      })
    }
    return video;
  }
});