Cuteflix.Views.UserShowView = Backbone.CompositeView.extend({
  
  template: JST["user_show"],
  
  initialize: function(options) {
    var view = this;
    this.model = options.user;
    this.tags = options.tags

    
    this.tags.each(function(tag){
      view.addTag(tag);
    })
  }, 
  
  render: function() {
    var renderedContent = this.template(); 
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this; 
  }, 
  
  addTag: function(tagModel) {
    var tagShowView = new Cuteflix.Views.TagShowView({
      model: tagModel
    });
    this.addSubview("#library", tagShowView);
  },
  
  
});