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
    
    this.collection.each(function(video) {
      view.addVideoView(video);
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

  
  addVideoView: function(videoModel) { 
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

    return this;  
  }, 
  
  events: {
    "mouseenter .left-arrow": "slideLeft",
    "mouseenter .right-arrow": "slideRight",
    "mouseleave .left-arrow": "stopLeft",
    "mouseleave .right-arrow": "stopRight",
    "mouseenter .videos-slider": "showArrows",
    "mouseleave .videos-slider": "hideArrows",
    "click .add-video": "toggleForm",
    "submit .video-form": "addNewVideo"
  }, 
  
  slideLeft: function() {
    var view = this; 
    this.intervalID = setInterval(function() {
      
      var firstThumb = view.subviews(".track")[0];
      var firstThumbLeft = firstThumb.el.getBoundingClientRect().left;
      var sliderLeft = view.$(".videos-slider")[0].getBoundingClientRect().left;
      
      if (firstThumbLeft < sliderLeft + 5) {
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
      
      if (lastThumbRight > sliderRight - 50) {
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
  }, 
  
  toggleForm: function() {
    this.$(".video-form").animate({width: "toggle"});
  }, 
  
  parseDomain: function(string) {
    var r = /:\/\/(.[^/]+)/;

    var domain = string.match(r);
    if (domain) {
      return domain[1].substring(4, domain[1].length - 4);
    }
  },
  
  parseYTID: function(string) {
    var query = string.split("?")[1];
    if (query) {
      var data = query.split("&");
      var result = {};
      for (var i = 0; i < data.length; i++) {
        var item = data[i].split("=");
        result[item[0]] = item[1];
      }
      return result.v;
    }
  },
  

  getVideoTitle: function(youTubeID, callback) {
    var url = "http://gdata.youtube.com/feeds/api/videos/" + youTubeID + "?v=2&alt=jsonc";
    $.getJSON(url, function(data) {
      var title = data.data.title;
      if (title.length > 40) {
        title = title.substring(0, 37) + "..."
      }
      callback(title);
    });
  },
  
  addNewVideo: function(event) {
    var view = this; 
    event.preventDefault();
    $form = $(event.currentTarget);
    var url = $form.serializeJSON().url;
    
    var tag = Cuteflix.tags.findWhere( {name: this.name} );
    var domain = this.parseDomain(url);
    if (domain === "youtube") {
      var youTubeID = this.parseYTID(url);
      if (youTubeID) {
        this.getVideoTitle(youTubeID, function(title) {
          var newVideo = new Cuteflix.Models.Video({
            ytid: youTubeID, 
            title: title, 
            tag_id: tag.id
          });
         
          newVideo.save({}, {
            success: function() {
              tag.videos().unshift(newVideo, { silent: true });
              tag.videos().trigger("prepend", newVideo);
              view.toggleForm();
            }
          });

          
        }); 
      } else {
        $form.find(".video-input").effect("shake");
      }
    } else {
      var input = $form.find(".video-input");
      input.effect("shake");
    }
  }
});
