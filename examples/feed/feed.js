var Message = Backbone.Model.extend({
});

var Messages = Backbone.Collection.extend({
  model: Message
});

var Thread = Backbone.Model.extend({

  initialize: function() {
    this.messages = new Messages;
  },

  addMessage: function(message) {
    this.messages.add(message);
  }
});

var Threads = Backbone.Collection.extend({
  model: Thread
});

var Publisher = View.extend({

  className: 'publisher',

  events: {
    'click button': 'postMessage'
  },

  template: '<textarea></textarea> <button>Post</button>',

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  getThread: function() {
    var thread = this.model;

    if (!thread) {
      thread = new Thread;
      this.collection.add(thread);
    }

    return thread;
  },

  postMessage: function(e) {
    var body = this.$('textarea').val();

    var message = new Message({
      body: body
    });

    this.getThread().addMessage(message);
  }
});

var MessageView = View.extend({

  className: 'message',

  render: function() {
    var messageBody = this.model.get('body');
    this.$el.html(messageBody);
    return this;
  }
});

var ThreadView = View.extend({

  className: 'thread',

  template: '<div class="messages"></div>',

  initialize: function() {
    var publisher = new Publisher({ model: this.model });
    this.add(publisher);

    this.listenTo(this.model.messages, 'add', this.createMessage);
  },

  createMessage: function(model) {
    var message = new MessageView({ model: model });
    this.add(message, '.messages');
    this.render();
  },

  render: function() {
    this.$el.html(this.template);
  }
});

var Feed = View.extend({

  initialize: function() {
    var publisher = new Publisher({ collection: this.collection });
    this.add(publisher);

    this.listenTo(this.collection, 'add', this.createThread);
  },

  createThread: function(model) {
    var thread = new ThreadView({ model: model });
    this.add(thread);
    this.render();
  }
});

var feed = new Feed({ el: '.feed', collection: new Threads });
feed.render();
