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
  

  
});
