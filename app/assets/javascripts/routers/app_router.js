Cuteflix.Routers.AppRouter = Backbone.Router.extend({
  
  initialize: function($rootEl){
    this.$rootEl = $rootEl
  }, 
  
  routes: {
    "": "videosIndex", 
    "videos/:id": "videoShow"
  }, 
  
  videosIndex: function() {
    // TODO: Combine this into one request? 
    Cuteflix.myListVideos.fetch({
      data: {
        my_list: true
      }
    });
    Cuteflix.recentVideos.fetch({
      data: {
        recent: true
      }
    });
    Cuteflix.tags.fetch();

    var videosIndexView = new Cuteflix.Views.VideosIndexView({
      tags: Cuteflix.tags,
      myListVideos: Cuteflix.myListVideos,
      recentVideos: Cuteflix.recentVideos
    });
    this._swapView(videosIndexView);
    // videosIndexView.setUpTour();
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

