Cuteflix.Views.VideoShowView = Backbone.CompositeView.extend({
  
  template: JST["video_show"],
  
  initialize: function(options){
    model: options.model
  }, 
  
  render: function() {
    var renderedContent = this.template({
      video: this.model
    });
    this.$el.html(renderedContent); 
    return this; 
  }
  
})