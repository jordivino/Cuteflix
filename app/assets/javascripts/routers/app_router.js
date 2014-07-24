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
      videos: Cuteflix.library 
    })
    Cuteflix.library.fetch();
    this._swapView(userShowView);
  }, 
  
  videoShow: function(id) {
    
  },
  
  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
  
});

