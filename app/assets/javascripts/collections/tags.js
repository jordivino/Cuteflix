Cuteflix.Collections.Tags = Backbone.Collection.extend({
  initialize: function(models, options){
    this.video = options.video
  },
  
  url: "api/videos/" + this.video.get("id") + "/tags" 
  model: Cuteflix.Models.Tag
  
});

