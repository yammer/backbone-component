var View = Backbone.View.extend({

  constructor: function() {
    this._children = [];
    this._wrapRender();

    Backbone.View.apply(this, arguments);
  },

  add: function(view, selector, method) {
    var child = { view: view, selector: selector, method: method };

    var removeFromParent = function() {
      this._children = _.without(this._children, child);
    };

    view._removeFromParent = _.bind(removeFromParent, this);

    this._children.push(child);
    this._attachChild(child);
    return this;
  },

  _removeFromParent: function() {
  },

  remove: function() {
    this._removeFromParent();
    this.removeChildren();
    Backbone.View.prototype.remove.apply(this, arguments);
    return this;
  },

  removeChildren: function() {
    _.invoke(_.pluck(this._children, 'view'), 'remove');
    return this;
  },

  _wrapRender: function() {
    var wrapper = function(render) {
      render();
      this._attachChildren();
      return this;
    };

    var originalRender = _.bind(this.render, this);
    this.render = _.wrap(originalRender, wrapper);
  },

  _attachChild: function(child) {
    method = child.method || 'append';
    var target = child.selector ? this.$(child.selector) : this.$el;

    target[method](child.view.$el);
  },

  _attachChildren: function() {
    _.each(this._children, function(child) {
      this._attachChild(child);
      child.view.delegateEvents();
    }, this);
  }
});
