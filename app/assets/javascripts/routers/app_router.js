Cuteflix.Routers.AppRouter = Backbone.Router.extend({
  
  initialize: function($rootEl){
    this.$rootEl = $rootEl
  }, 
  
  routes: {
    "": "userShow", 
    "videos/:id": "videoShow"
  }, 
  
  userShow: function() {
    
  }, 
  
  videoShow: function(id) {
    
  }
  
});