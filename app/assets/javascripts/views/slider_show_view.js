Cuteflix.Views.SliderShowView = Backbone.CompositeView.extend({
  
  template: JST["slider_show"],
  
  className: "slider",
  
  initialize: function(options) {
    var view = this; 
    this.collection = options.collection; 
    this.name = options.name;
    
    this.listenTo(
      this.collection, 
      "add", 
      this.addVideoView
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
    
    if (this.name !== "My List" && this.name !== "Recently Watched") {
      this.addBlankThumbView();
    }
    
    this.collection.each(function(video) {
      view.addVideoView(video);
    });
  }, 
  
  addBlankThumbView: function() {
    var blankThumbView = new Cuteflix.Views.BlankThumbView({
      name: this.name
    }); 
    this.addSubview(".track", blankThumbView);
  },
  
  addListVideo: function(videoModel) {
    // Adds video to front of collection
    var subview = new Cuteflix.Views.VideoThumbView({
      model: videoModel
    });
    
    subview.render();
    // this.subviews(".track").unshift(subview);
    this.subviews(".track").splice(1, 0, subview)

    // this.$(".track").prepend(subview.$el);
    this.$(".track > div:nth-child(1)").after(subview.$el);

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
		subview.delegateEvents();
  },

  
  addVideoView: function(videoModel) { 
    var videoThumbView = new Cuteflix.Views.VideoThumbView({
      model: videoModel
    });
    this.addSubview(".track", videoThumbView);
  }, 
  
  removeThumbView: function(videoModel) {
    var subviews = this.subviews(".track");
    var deletingSubview = _.findWhere(subviews, {model: videoModel})
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

    return this;  
  }, 
  
  events: {
    "mouseenter .left-arrow": "slideLeft",
    "mouseenter .right-arrow": "slideRight",
    "mouseleave .left-arrow": "stopLeft",
    "mouseleave .right-arrow": "stopRight",
    "mouseenter .videos-slider": "showArrows",
    "mouseleave .videos-slider": "hideArrows",

  }, 
  
  slideLeft: function() {
    var view = this; 
    this.intervalID = setInterval(function() {
      
      var firstThumb = view.subviews(".track")[0];
      var firstThumbLeft = firstThumb.el.getBoundingClientRect().left;
      var sliderLeft = view.$(".videos-slider")[0].getBoundingClientRect().left;
      
      if (firstThumbLeft < sliderLeft + 56) {
        var left = parseInt(view.$(".track").css("left"));
        view.$(".track").css("left", left + 3);
      }
      
    }, 10);
  },
  
  slideRight: function() {
    var view = this; 
    this.intervalID = setInterval(function() {
      
      var thumbs = view.subviews(".track");
      var lastThumb = thumbs[thumbs.length - 1];
      var lastThumbRight = lastThumb.el.getBoundingClientRect().right;
      var sliderRight = view.$(".videos-slider")[0].getBoundingClientRect().right;
      
      if (lastThumbRight > sliderRight - 56) {
        var left = parseInt(view.$(".track").css("left"));
        view.$(".track").css("left", left - 3);
      }
    }, 10);
  },
  
  stopLeft: function() {
    clearInterval(this.intervalID)
  }, 
  
  stopRight: function() {
    clearInterval(this.intervalID)
  },
  
  showArrows: function() {
    this.$(".arrow").show();
  },
  
  hideArrows: function() {
    this.$(".arrow").hide();
  }
});
