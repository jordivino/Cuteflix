Cuteflix.Views.VideosIndexView = Backbone.CompositeView.extend({
  
  template: JST["videos_index"],
  
  initialize: function(options) {
    var view = this;
    this.tags = options.tags
    this.myListVideos = options.myListVideos
    
    this.listenTo(
      this.tags, 
      "sync", 
      this.render
    );
    
    this.listenTo (
      this.tags, 
      "add",
      this.addTagSlider
    );
    
    
    this.addPersonalSlider({
      name: "My List",
      collection: this.myListVideos
    });
    
    
    this.tags.each(function(tag){
      view.addTagSlider(tag);
    });

  }, 
  
  render: function() {
    var renderedContent = this.template(); 
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this; 
  }, 
  
  addPersonalSlider: function(options) {
    var sliderShowView = new Cuteflix.Views.SliderShowView(options);
    this.addSubview("#personalized", sliderShowView)
  }, 
  
  addTagSlider: function(tagModel) {
    var name = tagModel.get("name"); 
    var videos = tagModel.videos();
    var sliderShowView = new Cuteflix.Views.SliderShowView({
      name: name,
      collection: videos
    });
    this.addSubview("#library", sliderShowView)
  }
  
  
});