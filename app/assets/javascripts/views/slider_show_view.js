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
    
    this.listenTo(
      this.collection,
      'prepend',
      this.addListVideo
    )
    
    
    this.listenTo(
      this.collection,
      "remove",
      this.removeThumbView
    )
     
    this.listenTo(
      this.collection, 
      "remove", 
      this.render
    )
    
    this.collection.each(function(video) {
      view.addVideo(video)
    });
  }, 
  
  addListVideo: function(videoModel) {
    // Adds video to front of collection
    var subview = new Cuteflix.Views.VideoThumbView({
      model: videoModel
    });
    
    subview.render();
    this.subviews(".track").unshift(subview);

    this.$(".track").prepend(subview.$el);

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
		subview.delegateEvents();
  },

  
  addVideo: function(videoModel) { 
    var videoThumbView = new Cuteflix.Views.VideoThumbView({
      model: videoModel
    });
    this.addSubview(".track", videoThumbView);
  }, 
  
  removeThumbView: function(videoModel) {
    var subviews = this.subviews(".track");
    var deletingSubview; 
    for (var i = 0; i < subviews.length; i++) {
      var subview = subviews[i];
      if (subview.model.get("id") === videoModel.get("id")) {
        var deletingSubview = subview; 
        break; 
      } 
    }
    this.removeSubview(".track", deletingSubview)
    this.render();
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
