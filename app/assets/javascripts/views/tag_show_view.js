Cuteflix.Views.TagShowView = Backbone.CompositeView.extend({
  
  template: JST["tag_show"],
  
  initialize: function(options) {
    var view = this; 
    this.model = options.model; 
    var videoIndexView = new Cuteflix.Views.VideosIndexView({
      collection: this.model.videos()
    });
    this.addSubview(".videos", videoIndexView)
  }, 
  
  render: function() {
    var renderedContent = this.template({
      tag: this.model
    }); 
    this.$el.html(renderedContent); 
    this.attachSubviews();
    return this;  
  }
  
});
