# Backbone Component [![Build Status](https://travis-ci.org/yammer/backbone-component.png)](https://travis-ci.org/yammer/backbone-component)

A thin layer on top of Backbone's view class to add nested child views.


## Install

To install project dependencies:

```sh
make install
```

## Testing

To run tests in *development* mode:

```sh
make testem
```

To run tests in *continuous integration* mode:

```sh
make
```


## Usage

```js
var message = new MessageView();
var reply = new ReplyView();

message.add(reply);
message.render();
```

Will render:

```html
<div class="message">
  <div class="reply">
  </div>
</div>
```

See *examples* directory for more.


## API

### append(child, [selector])
#### alias: add

Adds a child view to the view's element.
Optionally define the selector to attach to, which defaults to `$el`. 

### prepend(child, [selector])

Adds a child to the beginning of the view's element.
Optionally define the selector to attach to, which defaults to `$el`. 

### renderTemplate([data])

Renders the view's template with supplied data.
Defaults to using underscore templates, but can be overriden by replacing the
`renderer` prototype property with any object that responds to `compile` and
returns a function which renders the template with the supplied data, e.g:

```js
Backbone.Component.prototype.renderer = {
  compile: function(template) {
    return _.partial(Mustache.render, template);
  }
};
```
