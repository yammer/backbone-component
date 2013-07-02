var SimpleView = View.extend({

  initialize: function() {
    this.renderCount = 0;
  },

  events: {
    'click .render': 'render',
    'click .remove': 'remove'
  },

  html: function() {
    return '\
      ' + this.cid + '\
      Rendered: ' + this.renderCount + '\
      <button class="render">Render</button>\
      <button class="remove">Remove</button>\
    '
  },

  render: function() {
    this.$el.html(this.html());
    View.prototype.render.apply(this, arguments);
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
