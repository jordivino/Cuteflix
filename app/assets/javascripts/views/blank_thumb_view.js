Cuteflix.Views.BlankThumbView = Backbone.View.extend({

  template: JST["blank_thumb"],

  className: "thumbs thumbnail blank-thumb",

  initialize: function(options) {
    this.name = options.name;
  },

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  events: {
    "click": "toggleForm"
  },

  toggleForm: function(event) {
    if ($(event.target).is(".video-input")){
      return false;
    } else if ($(event.target).is(".video-submit")) {
      this.addNewVideo(this.$(".video-form"));
    } else {
      this.openOrClose();
    }
  },

  openOrClose: function() {
    var view = this;
    var thumb = this.$el;

    thumb.toggleClass("thumb-open");
    var width = thumb.css("width");

    if (width === "350px") {
      var firstTimer = 0;
      var secondTimer = 100;
    } else {
      var firstTimer = 100;
      var secondTimer = 0;
    }

    setTimeout(function() {
      view.$(".video-form").removeClass("has-error");
      view.$(".video-form").toggle();
      view.$(".video-alert").hide();
    }, firstTimer);

    setTimeout(function() {
      view.$(".add-new-video-text").toggle();
    }, secondTimer);
  },

  parseDomain: function(string) {
    var r = /:\/\/(.[^/]+)/;

    var domain = string.match(r);
    if (domain) {
      return domain[1].substring(4, domain[1].length - 4);
    }
  },

  parseYTID: function(string) {
    var query = string.split("?")[1];
    if (query) {
      var data = query.split("&");
      var result = {};
      for (var i = 0; i < data.length; i++) {
        var item = data[i].split("=");
        result[item[0]] = item[1];
      }
      return result.v;
    }
  },

  getVideoTitle: function(youTubeID, callback) {
    var url = "https://www.googleapis.com/youtube/v3/videos";
    var key = "AIzaSyAxBI-Km-Kj58CUZ-qyy1jDPG3NPFKltyQ";

    $.getJSON(url, {
      key: key,
      part: "snippet",
      id: youTubeID
    }, function(data) {
      var title = data.items[0].snippet.title;
      if (title.length > 40) {
        title = title.substring(0, 38) + "...";
      }
      callback(title);
    });
  },

  addNewVideo: function($form) {
    var view = this;
    event.preventDefault();
    var url = $form.serializeJSON().url;

    var tag = Cuteflix.tags.findWhere( {name: this.name} );
    var domain = this.parseDomain(url);
    if (domain === "youtube") {
      var youTubeID = this.parseYTID(url);
      if (youTubeID) {
        this.getVideoTitle(youTubeID, function(title) {
          var newVideo = new Cuteflix.Models.Video({
            ytid: youTubeID,
            title: title,
            tag_id: tag.id
          });

          newVideo.save({}, {
            success: function() {
              tag.videos().unshift(newVideo, { silent: true });
              tag.videos().trigger("prepend", newVideo);
              view.$(".video-input").val("");
              view.openOrClose();
            }
          });
        });
      } else {
        this.badLink($form);
      }
    } else {
      this.badLink($form);
    }
  },

  badLink: function($form) {
    var input = $form.find(".video-input");
    input.val("");
    $form.addClass("has-error");
    $form.effect("shake");
    input.focus();
    $form.find(".video-alert").show();
  }
});
