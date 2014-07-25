Cuteflix.Routers.AppRouter = Backbone.Router.extend({
  
  initialize: function($rootEl){
    this.$rootEl = $rootEl
  }, 
  
  routes: {
    "": "videosIndex", 
    "videos/:id": "videoShow"
  }, 
  
  videosIndex: function() {
    var videosIndexView = new Cuteflix.Views.VideosIndexView({
      tags: Cuteflix.tags
    });
    this._swapView(videosIndexView);
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