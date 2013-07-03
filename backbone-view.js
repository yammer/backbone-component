var View = Backbone.View.extend({

  constructor: function() {
    this._children = [];
    this.add = this.append;
    this._wrapRender();

    Backbone.View.apply(this, arguments);
  },

  append: function(view, selector) {
    this._addChild(view, selector, 'append');
    return this;
  },

  prepend: function(view, selector) {
    this._addChild(view, selector, 'prepend');
    return this;
  },

  remove: function() {
    this._removeFromParent();
    this._removeChildren();
    Backbone.View.prototype.remove.apply(this, arguments);
    return this;
  },

  _addChild: function(view, selector, method) {
    var child = { view: view, selector: selector, method: method };

    var removeFromParent = _.bind(this._removeFromParent, this);
    view._removeFromParent = _.partial(removeFromParent, child);

    this._children.push(child);
  },

  _removeChildren: function() {
    _.invoke(_.pluck(this._children, 'view'), 'remove');
  },

  _removeFromParent: function(child) {
    this._children = _.without(this._children, child);
  },

  _wrapRender: function() {
    var wrapper = function(render) {
      var args = Array.prototype.slice.call(arguments, 1);
      render.apply(this, args);
      this._attachChildren();
      return this;
    };

    var originalRender = _.bind(this.render, this);
    this.render = _.wrap(originalRender, wrapper);
  },

  _attachChild: function(child) {
    var method = child.method || 'append';
    var target = child.selector ? this.$(child.selector) : this.$el;

    child.view.render();
    target[method](child.view.$el);
  },

  _attachChildren: function() {
    _.each(this._children, function(child) {
      this._attachChild(child);
      child.view.delegateEvents();
    }, this);
  }
});
