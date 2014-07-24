Cuteflix.Views.TagsIndexView = Backbone.CompositeView.extend({
  
  template: JST["tags_index"],
  
  initialize: function(options) {
    var view = this; 
    this.collection = options.collection
    
    this.collection.each(function(tag){
      view.addTag(tag);
    })
  }, 
  
  addTag: function(tagModel) {
    var tagShowView = new Cuteflix.Views.TagShowView({
      model: tagModel
    });
    this.addSubview("#tags", tagShowView);
  },
  
  render: function() {
    var renderedContent = this.template()
    this.$el.html(renderedContent); 
    this.attachSubviews();
    return this; 
  }
  
});
