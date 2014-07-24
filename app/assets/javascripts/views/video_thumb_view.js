Cuteflix.Views.VideoThumbView = Backbone.View.extend({
  
  template: JST["video_thumb"], 
  
  intitialize: function(options) {
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
    "click .image": "imageClicked"
  }, 
  
  imageClicked: function(event) {
    alert("redirecting")
  }
  
});
