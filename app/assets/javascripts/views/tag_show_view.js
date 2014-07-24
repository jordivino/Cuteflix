Cuteflix.Views.TagShowView = Backbone.CompositeView.extend({
  
  template: JST["tag_show"],
  
  initialize: function(options) {
    var view = this; 
    this.model = options.model; 
    
    this.model.videos().each(function(video) {
      view.addVideo(video)
    });
  }, 
  
  addVideo: function(videoModel) { 
    var videoThumbView = new Cuteflix.Views.VideoThumbView({
      model: videoModel
    });
    this.addSubview(".track", videoThumbView);
  }, 
  
  render: function() {
    var renderedContent = this.template({
      tag: this.model
    }); 
    this.$el.html(renderedContent); 
    this.attachSubviews();
    return this;  
  }, 
  
  events: {
    "mouseenter .left": "slideLeft",
    "mouseenter .right": "slideRight",
    "mouseleave .left": "stopLeft",
    "mouseleave .right": "stopRight"
  }, 
  
  slideLeft: function(event) {
    
  }, 
  
  slideRight: function(event) {
    
  },
  
  stopLeft: function(event) {
    
  }, 
  
  stopRight: function(event) {
    
  },
  
});
