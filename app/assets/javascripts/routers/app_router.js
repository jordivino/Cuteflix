Cuteflix.Routers.AppRouter = Backbone.Router.extend({
  
  initialize: function($rootEl){
    this.$rootEl = $rootEl
  }, 
  
  routes: {
    "": "userShow", 
    "videos/:id": "videoShow"
  }, 
  
  userShow: function() {
    var userShowView = new Cuteflix.Views.UserShowView({
      // Need to implement logged in user 
      tags: Cuteflix.tags
    });
    this._swapView(userShowView);
  }, 
  
  videoShow: function(id) {
    var video = Cuteflix.videos.getOrFetch(id);
    var videoShowView = new Cuteflix.Views.VideoShowView({
      model: video
    }); 
    this._swapView(videoShowView);
  },
  
  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
  
});