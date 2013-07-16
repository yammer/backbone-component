var SimpleView = Backbone.Component.extend({

  template: _.template('\
    <%=id%>\
    Rendered: <%=count%>\
    <button class="render">Render</button>\
    <button class="remove">Remove</button>\
    <button class="add-child">Add child</button>\
  '),

  initialize: function() {
    this.renderCount = 0;
  },

  events: {
    'click .render': 'render',
    'click .remove': 'remove',
    'click .add-child': 'addChild'
  },

  addChild: function(e) {
    e.stopPropagation();

    var child = new SimpleView;
    this.add(child);
    this.render();
  },

  render: function() {
    this.$el.html(this.template({ id: this.cid, count: this.renderCount++ }));
    return this;
  }
});

$('.add-view').click(function(e) {
  var parentView = new SimpleView();
  parentView.render();
  $('.views').append(parentView.$el);
});
