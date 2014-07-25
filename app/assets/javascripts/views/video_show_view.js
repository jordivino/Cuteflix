Cuteflix.Views.VideoShowView = Backbone.CompositeView.extend({
  
  template: JST["video_show"],
  
  initialize: function(options){
    
    this.model = options.model

    this.listenTo(
      this.model,
      "sync",
      this.render
    )
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
      height: '488',
      width: '800',
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
  }
  
})