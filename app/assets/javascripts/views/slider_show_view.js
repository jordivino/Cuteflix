Cuteflix.Views.SliderShowView = Backbone.CompositeView.extend({
  
  template: JST["slider_show"],
  
  initialize: function(options) {
    var view = this; 
    this.collection = options.collection; 
    this.name = options.name
    
    this.listenTo(
      this.collection, 
      "add", 
      this.addVideo
    )
    
    this.collection.each(function(video) {
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
      name: this.name
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
      var left = parseInt(view.$(".track").css("left"));
      view.$(".track").css("left", left + 2)
    }, 10);
  },
  
  slideRight: function(event) {
    var view = this; 
    
    this.intervalID = setInterval(function() {
      var left = parseInt(view.$(".track").css("left"))
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
