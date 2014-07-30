Cuteflix.Views.VideoThumbView = Backbone.View.extend({
  
  template: JST["video_thumb"], 
  
  tagName: "li",
  
  className: "thumbs thumbnail",
  
  initialize: function(options) {
    this.model = options.model; 
    this.model.fetch();
    
    this.listenTo( 
      this.model, 
      "removeFromMyList addToMyList", 
      this.render
    );
  }, 
  
  
  render: function() { 
    var renderedContent = this.template({
      video: this.model
    }); 
  
    this.$el.html(renderedContent); 
    
    setTimeout(function() {
      this.$(".toggle-list").tooltip({
        delay: { show: 500 },
        placement: "left auto"
      });
    });

    return this;
  }, 
  
  events: {
    "click .remove-list": "removeFromMyList", 
    "click .add-list": "addToMyList", 
  }, 
  
  removeFromMyList: function(event) {
    Cuteflix.myListVideos.remove(this.model);
    var id = this.model.id;
    $.ajax ({
      url: "/api/videos/" + id + "/remove_my_list",
      type: "DELETE",
    });

    this.updateIcon("removeFromMyList");
  }, 
  
  addToMyList: function(event) {
    Cuteflix.myListVideos.unshift(this.model, { silent: true });
    Cuteflix.myListVideos.trigger("prepend", this.model);
    var id = this.model.id;
    $.ajax ({
      url: "/api/videos/" + id + "/add_my_list",
      type: "POST",
    });

    this.updateIcon("addToMyList");
  }, 
  
  updateIcon: function(trigger) {
    // Since Recently Watched and My List can store duplicate versions 
    // of the same video, they do not reliably receive the trigger event
    // to re-render. Therefore, it's necessary to explicitly find the 
    // correct model in each collection and trigger the event.
    
    var video_id = this.model.id;
    var videoInRecent = Cuteflix.recentVideos.get(video_id);
    if (videoInRecent) {
      videoInRecent.trigger(trigger);
    }
    this.model.tags().each(function(tag) {
      var tagInCollection = Cuteflix.tags.get(tag.id)
      var videoInTag = tagInCollection.videos().get(video_id);
      if (videoInTag) {
        videoInTag.trigger(trigger)
      }
    }); 
  }


  
});


