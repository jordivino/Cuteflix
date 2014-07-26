Cuteflix.Views.VideoThumbView = Backbone.View.extend({
  
  template: JST["video_thumb"], 
  
  className: "thumbs",
  
  initialize: function(options) {
    this.model = options.model 
  }, 
  
  render: function() { 
    var renderedContent = this.template({
      video: this.model
    }); 
    
    this.$el.html(renderedContent); 
    
    return this;
  }, 
  
  events: {
    "click .remove-list": "removeFromMyList", 
    "click .add-list": "addToMyList", 
    "click .add-queue": "addToQueue"
  }, 
  
  removeFromMyList: function(event) {
    Cuteflix.myListVideos.remove(this.model);
    var id = this.model.get("id");
    $.ajax ({
      url: "/api/videos/" + id + "/remove_my_list",
      type: "GET",
    });
  }, 
  
  addToMyList: function(event) {
    Cuteflix.myListVideos.add(this.model, { silent: true });
    Cuteflix.myListVideos.trigger("prepend", this.model);
    var id = this.model.get("id");
    $.ajax ({
      url: "/api/videos/" + id + "/add_my_list",
      type: "GET",
    });
     
  }, 
  
  addToQueue: function(event) {}

  
});


