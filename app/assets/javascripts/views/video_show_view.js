Cuteflix.Views.VideoShowView = Backbone.CompositeView.extend({

  template: JST["video_show"],

  initialize: function(options){

    this.model = options.model;

    this.listenTo(
      this.model,
      "sync",
      this.render
    );

    this.addToRecent();
  },

  events: {
    "mouseenter #player": "showBackButton",
    "mouseleave #player": "hideBackButton"
  },

  render: function() {
    var renderedContent = this.template({
      video: this.model
    });
    this.$el.html(renderedContent);
    if (this.model.get("ytid")) {
      this.loadVideo();
    }
    return this;
  },

  loadVideo: function() {
    var player;
    player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: this.model.get("ytid"),
      playerVars: {
        autohide: "1",
        autoplay: "1",
        controls: "2",
        iv_load_policy: "3",
        modestbranding: "1",
        rel: "0",
        showinfo: "0"
      },
    });
  },

  addToRecent: function() {
    if (Cuteflix.recentVideos.get(this.model.id)) {
      Cuteflix.recentVideos.remove(this.model);
    }
    Cuteflix.recentVideos.unshift(this.model, { silent: true});

    var id = this.model.id;
    $.ajax ({
      url: "/api/videos/" + id + "/add_recent",
      type: "POST"
    });
  }
});
