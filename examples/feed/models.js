Backbone.sync = function() {};

var Message = Backbone.Model.extend({
  validate: function() {
    if (this.get('body').length === 0) {
      return "body can't be empty";
    }
  }
});

var Messages = Backbone.Collection.extend({
  model: Message
});

var Thread = Backbone.Model.extend({
  initialize: function() {
    this.messages = new Messages();
  },

  addMessage: function(message) {
    this.messages.add(message);
  }
});

var Threads = Backbone.Collection.extend({
  model: Thread
});
