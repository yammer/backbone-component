var Publisher = Backbone.Component.extend({

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

  postMessage: function(e) {
    var body = this.$('textarea').val();

    var message = new Message({
      body: body
    });

    if (message.isValid()) {
      var thread = this.model || this.collection.create();
      thread.addMessage(message);
    }

    this.$('textarea').val('');
  }
});

var MessageView = Backbone.Component.extend({

  className: 'message',

  render: function() {
    var messageBody = this.model.get('body');
    this.$el.html(messageBody);
    return this;
  }
});

var ThreadView = Backbone.Component.extend({

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

var ThreadList = Backbone.Component.extend({

  initialize: function() {
    this.listenTo(this.collection, 'add', this.createThread);
  },

  createThread: function(model) {
    var thread = new ThreadView({ model: model });
    this.prepend(thread);
    this.render();
  }
});

var Feed = Backbone.Component.extend({

  initialize: function() {
    var publisher = new Publisher({ collection: this.collection });
    this.add(publisher);

    var threads = new ThreadList({ collection: this.collection });
    this.add(threads);
  }
});

var feed = new Feed({ el: '.feed', collection: new Threads });
feed.render();
