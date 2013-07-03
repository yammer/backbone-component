var Publisher = View.extend({

  className: 'publisher',

  events: {
    'click button': 'postMessage'
  },

  template: _.template('\
    <textarea placeholder="<%= placeholderText %>"></textarea>\
    <button><%= buttonText %></button>\
  '),

  render: function() {
    var placeholderText = !this.model ? "What are you working on?" : "Write a reply...";
    var buttonText = !this.model ? "Post" : "Reply";

    this.$el.html(this.template({ placeholderText: placeholderText, buttonText: buttonText}));
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

    if (message.validate()) {
      this.getThread().addMessage(message);
    }

    this.$('textarea').val('');
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

var ThreadList = View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'add', this.createThread);
  },

  createThread: function(model) {
    var thread = new ThreadView({ model: model });
    this.prepend(thread);
    this.render();
  }
});

var Feed = View.extend({

  initialize: function() {
    var publisher = new Publisher({ collection: this.collection });
    this.add(publisher);

    var threads = new ThreadList({ collection: this.collection });
    this.add(threads);
  }
});

var feed = new Feed({ el: '.feed', collection: new Threads });
feed.render();
