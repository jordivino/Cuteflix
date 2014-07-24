Cuteflix.Views.UserShowView = Backbone.CompositeView.extend({
  template: JST["user_show"],
  
  initialize: function(options) {
    this.videos = options.videos;
  }
})