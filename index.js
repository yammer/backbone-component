window.$ = require('./vendor/jquery.js');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  add: function(child) {
    this.$el.append(child.$el);
  }
});
