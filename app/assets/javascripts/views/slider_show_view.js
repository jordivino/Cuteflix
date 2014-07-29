Cuteflix.Views.SliderShowView = Backbone.CompositeView.extend({
  
  template: JST["slider_show"],
  
  initialize: function(options) {
    var view = this; 
    this.collection = options.collection; 
    this.name = options.name;
    
    this.listenTo(
      this.collection, 
      "add", 
      this.addVideo
    );
    
    this.listenTo(
      this.collection,
      'prepend',
      this.addListVideo
    );
    
    this.listenTo(
      this.collection,
      "remove",
      this.removeThumbView
    );
     
    this.listenTo(
      this.collection, 
      "remove", 
      this.render
    );
    
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
      if (subview.model.id === videoModel.id) {
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
    this.$(".arrow").hide();

    this.attachSubviews();
    
    $(document).ready(function() {
      view.scrolling();
    });

    return this;  
  }, 
  
  scrolling: function() {
    var view = this; 
    setTimeout(function () {
    	// Init Smooth Div Scroll	
    	view.$("#makeMeScrollable").smoothDivScroll({
    		manualContinuousScrolling: true, 
        hotSpotScrolling: true, 
        visibleHotSpotBackgrounds: "onStart", 
        
    	});
    })
  },
  
  
  events: {
    "mouseenter .left-arrow": "slideLeft",
    "mouseenter .right-arrow": "slideRight",
    "mouseleave .left-arrow": "stopLeft",
    "mouseleave .right-arrow": "stopRight", 
    "mouseenter .videos-slider": "showArrows",
    "mouseleave .videos-slider": "hideArrows"
  }, 
  
  slideLeft: function(event) {
    var view = this; 
    
    this.intervalID = setInterval(function() {
      // var left = parseInt(view.$(".track").css("left"));
      // view.$(".track").css("left", left + 2);
      
      view.subviews(".track").forEach(function(subview) {
        // debugger
        

        var center = subview.el.getBoundingClientRect().left + 125
        var newCenter = center + 20
        if (subview.model.get("title") === "Puppies on Slides") {
          console.log(center)
        }
        subview.$el.css("transform", "translate(" + newCenter + "px)")
      
        
        // lefts.push(subview.el.getBoundingClientRect().left);
        if (subview.el.getBoundingClientRect().left > window.innerWidth) {
          // view.removeSubview(".track", subview);
          // view.queueToLeft(subview);
          // console.log(subview.model.get("title") + " is off the screen")
        }
        
      });

      
    }, 10);
  },
  
  slideRight: function(event) {
    var view = this; 
    this.intervalID = setInterval(function() {
      var left = parseInt(view.$(".track").css("left"));
      view.$(".track").css("left", left - 2);
      
    }, 10);
  },
  
  stopLeft: function(event) {
    clearInterval(this.intervalID)
  }, 
  
  stopRight: function(event) {
    clearInterval(this.intervalID)
  },
  
  showArrows: function(event) {
    this.$(".arrow").show();
  },
  
  hideArrows: function(event) {
    this.$(".arrow").hide();
  }
  
});
