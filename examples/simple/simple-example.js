var SimpleView = View.extend({

  initialize: function() {
    this.renderCount = 0;
  },

  events: {
    'click .render': 'render',
    'click .remove': 'remove',
    'click .add-child': 'addChild'
  },

  html: function() {
    return '\
      ' + this.cid + '\
      Rendered: ' + this.renderCount + '\
      <button class="render">Render</button>\
      <button class="remove">Remove</button>\
      <button class="add-child">Add child</button>\
    '
  },

  addChild: function(e) {
    if (e) e.stopPropagation();
    var child = new SimpleView;
    this.add(child);
    child.render();
  },

  render: function(e) {
    this.$el.html(this.html());
    this.renderCount++;
  }
});

var parentView = new SimpleView({ el: '.views' });
parentView.render();

$('.add-view').click(function(e) {
  var child = new SimpleView;
  parentView.add(child);
  child.render();
});
