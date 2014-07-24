Cuteflix.Collections.Tags = Backbone.Collection.extend({
  
  url: "/api/tags"
  model: Cuteflix.Models.Tag,
  
  getOrFetch: function(id) {
    var tags = this; 
    var tag = tags.get(id);
    if (tag) {
      tag.fetch();
    } else {
      tag = new Cuteflix.Models.Tag({
        id: id
      });
      tag.fetch({
        success: function() {
          tags.add(tag);
        }
      })
    }
    return tag;
  }
  
});

