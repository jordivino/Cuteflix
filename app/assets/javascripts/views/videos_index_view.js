Cuteflix.Views.VideosIndexView = Backbone.CompositeView.extend({
  
  template: JST["videos_index"],
  
  initialize: function(options) {
    var view = this;
    this.collection = options.collection;
    
    this.collection.each(function(video) {
      view.addVideo(video)
    });
  }, 
  
  addVideo: function(videoModel) { 
    var videoThumbView = new Cuteflix.Views.VideoThumbView({
      model: videoModel
    });
    this.addSubview(".thumbs", videoThumbView);
  }, 
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent); 
    this.attachSubviews();
    return this; 
  }
  
  
}); 
