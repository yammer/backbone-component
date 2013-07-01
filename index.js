window.$ = require('./vendor/jquery.js');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({

  constructor: function() {
    this._children = [];

    Backbone.View.apply(this, arguments);
  },

  add: function(child) {
    this._children.push(child);
    this.$el.append(child.$el);
  },

  render: function() {
    _.each(this._children, function(child) {
      child.render();
    });
  }
});
