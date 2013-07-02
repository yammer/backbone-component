var View = Backbone.View.extend({

  constructor: function() {
    this._children = [];
    Backbone.View.apply(this, arguments);
  },

  add: function(view, selector, method) {
    var child = { view: view, selector: selector, method: method };
    this._children.push(child);
    this._attachChild(child);
    return this;
  },

  removeChildren: function() {
    _.invoke(_.pluck(this._children, 'view'), 'remove');
    return this;
  },

  remove: function() {
    this.removeChildren();
    Backbone.View.prototype.remove.apply(this, arguments);
    return this;
  },

  render: function() {
    _.each(this._children, function(child) {
      this._attachChild(child);
      child.view.delegateEvents();
    }, this);

    return this;
  },

  _attachChild: function(child) {
    method = child.method || 'append';
    var target = child.selector ? this.$(child.selector) : this.$el;

    target[method](child.view.$el);
  }
});
