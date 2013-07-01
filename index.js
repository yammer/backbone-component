window.$ = require('./vendor/jquery.js');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({

  constructor: function() {
    this._children = [];
    Backbone.View.apply(this, arguments);
  },

  add: function(child, selector, method) {
    this._children.push(child);

    method = method || 'append';
    var target = selector ? this.$(selector) : this.$el;

    target[method](child.$el);

    return this;
  },

  remove: function() {
    _.each(this._children, function(child) {
      child.remove();
    });

    Backbone.View.prototype.remove.apply(this, arguments);

    return this;
  },

  render: function() {
    _.each(this._children, function(child) {
      child.render();
    });

    return this;
  }
});
