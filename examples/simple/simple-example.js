var SimpleView = View.extend({

  initialize: function() {
    this.renderCount = 0;
  },

  events: {
    'click': 'handleClick'
  },

  handleClick: function(e) {
    e.stopPropagation();
    e.preventDefault();

    this.render();
  },

  render: function() {
    this.$el.html('<button>' + this.cid + '</button> Rendered: ' + this.renderCount);
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
