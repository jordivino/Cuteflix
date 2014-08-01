Cuteflix.Views.BlankThumbView = Backbone.View.extend({

  template: JST["blank_thumb"], 
  
  className: "thumbs thumbnail blank-thumb",
  
  initialize: function(options) {
    this.name = options.name
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }, 
  
  events: {
    "click": "toggleForm"
  },
  
  toggleForm: function(event) {
    if ($(event.target).is(".video-input")){
      return false
    } else if ($(event.target).is(".video-submit")) {
      this.addNewVideo(this.$(".video-form"));
    } else {
      var view = this; 
      
      this.openOrClose();
      
    }
  },
  
  openOrClose: function() {
    var view = this;
    var thumb = this.$el;
    
    thumb.toggleClass("thumb-open");
    var width = thumb.css("width");
  
    var timeout = (width === "350px") ? 0 : 100 
    setTimeout(function() {
      view.$(".add-new-video, .add-new-video-text, .video-form").toggle();
      view.$(".video-input").focus();
    }, timeout);
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
        title = title.substring(0, 38) + "..."
      }
      callback(title);
    });
  },
  
  addNewVideo: function($form) {
    var view = this; 
    event.preventDefault();
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
              view.openOrClose()   
            }
          });

          
        }); 
      } else {
        var input = $form.find(".video-input");
        input.val("");
        $form.addClass("has-error");
        $form.effect("shake");
        input.focus();
        
      }
    } else {
      var input = $form.find(".video-input");
      input.val("");
      $form.addClass("has-error");
      $form.effect("shake");
      input.focus();
    }
  }

}); 