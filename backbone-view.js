var View = Backbone.View.extend({

  constructor: function() {
    this._children = [];
    Backbone.View.apply(this, arguments);
  },

  attach: function(child) {
    method = child.method || 'append';
    var target = child.selector ? this.$(child.selector) : this.$el;

    target[method](child.view.$el);
  },

  add: function(view, selector, method) {
    var child = { view: view, selector: selector, method: method };
    this._children.push(child);
    this.attach(child);
    return this;
  },

  remove: function() {
    _.invoke(_.pluck(this._children, 'view'), 'remove');
    Backbone.View.prototype.remove.apply(this, arguments);
    return this;
  },

  render: function() {
    _.each(this._children, function(child) {
      this.attach(child);
      child.view.delegateEvents();
    }, this);

    return this;
  }
});
