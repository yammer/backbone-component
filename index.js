window.$ = require('./vendor/jquery.js');
var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.View.extend({

  constructor: function() {
    this._children = [];
    Backbone.View.apply(this, arguments);
  },

  add: function(child, selector) {
    this._children.push(child);

    if (selector) {
      this.$el.find(selector).append(child.$el);
    }
    else {
      this.$el.append(child.$el);
    }
  },

  render: function() {
    _.each(this._children, function(child) {
      child.render();
    });

    return this;
  }
});
