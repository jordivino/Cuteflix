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
    var view = this; 
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
    var view = this; 
    
    this.intervalID = setInterval(function() {
      var left = parseInt(this.$(".track").css("left"))
      view.$(".track").css("left", left + 2)
    }, 10);
  },
  
  slideRight: function(event) {
    var view = this; 
    
    this.intervalID = setInterval(function() {
      var left = parseInt(this.$(".track").css("left"))
      view.$(".track").css("left", left - 2)
    }, 10);
  },
  
  stopLeft: function(event) {
    clearInterval(this.intervalID)
  }, 
  
  stopRight: function(event) {
    clearInterval(this.intervalID)
  },
  
});
