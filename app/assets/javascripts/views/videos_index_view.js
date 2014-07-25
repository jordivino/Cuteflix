Cuteflix.Views.VideosIndexView = Backbone.CompositeView.extend({
  
  template: JST["videos_index"],
  
  initialize: function(options) {
    var view = this;
    this.model = options.user;
    this.tags = options.tags

    this.addSlider({
      name: "My List",
      // How to make API request for myListVideos?
      collection: Cuteflix.myListVideos
    })
    
    this.tags.each(function(tag){
      view.addSlider({
        name: tag.get("name"),
        collection: tag.videos()
      });
    })
  }, 
  
  render: function() {
    var renderedContent = this.template(); 
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this; 
  }, 
  
  addSlider: function(options) {
    var sliderShowView = new Cuteflix.Views.SliderShowView(options);
    if (options.name === "My List") {
      this.addSubview("#personalized", sliderShowView)
    } else {
      this.addSubview("#library", sliderShowView);
    }
  },
  
  
});