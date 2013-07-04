var SimpleView = Backbone.Component.extend({

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
    this.render();
  },

  render: function() {
    this.$el.html(this.html());
    this.renderCount++;
  }
});

$('.add-view').click(function(e) {
  var parentView = new SimpleView();
  parentView.render();
  $('.views').append(parentView.$el);
});
