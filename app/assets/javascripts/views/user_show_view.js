Cuteflix.Views.UserShowView = Backbone.CompositeView.extend({
  
  template: JST["user_show"],
  
  initialize: function(options) {
    this.model = options.user;
    this.tags = options.tags;
    
    var tagsIndexView = new Cuteflix.Views.TagsIndexView({
      collection: this.tags
    });
    
    this.addSubview("#library", tagsIndexView); 
  }, 
  
  render: function() {
    var renderedContent = this.template(); 
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this; 
  }
  
  
});