# Backbone Component

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

## API

### append(child, [selector])
#### alias: add

Adds a child view to the view's element.
Optionally define the selector to attach to, which defaults to `$el`. 

### prepend(child, [selector])

Adds a child to the beginning of the view's element.
Optionally define the selector to attach to, which defaults to `$el`. 

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
