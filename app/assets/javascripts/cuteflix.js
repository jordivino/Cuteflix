window.Cuteflix = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Cuteflix.videos = new Cuteflix.Collections.Videos();
    Cuteflix.myListVideos = new Cuteflix.Collections.Videos();
    Cuteflix.recentVideos = new Cuteflix.Collections.Videos();
    Cuteflix.tags = new Cuteflix.Collections.Tags();

    var $rootEl = $("#content");
    new Cuteflix.Routers.AppRouter($rootEl);
    Backbone.history.start();
  }
};

Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    // Try to attach the subview. Render it as a convenience.
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
    subview.delegateEvents();
  },

  removeAllSubviews: function(selector) {
    var view = this;
    this.subviews(selector).forEach(function(subview){
      view.removeSubview(selector, subview);
    });
  },

  attachSubviews: function () {
    // I decided I didn't want a function that renders ALL the
    // subviews together. Instead, I think:
    //
    // * The user of CompositeView should explicitly render the
    //   subview themself when they build the subview object.
    // * The subview should listenTo relevant events and re-render
    //   itself.
    //
    // All that is necessary is "attaching" the subview `$el`s to the
    // relevant points in the parent CompositeView.

    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) { subview.remove(); });
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    // Map of selectors to subviews that live inside that selector.
    // Optionally pass a selector and I'll initialize/return an array
    // of subviews for the sel.
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});
