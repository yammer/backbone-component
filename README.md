# Backbone View

A thin layer on top of Backbone's view class to add nested child views.

## Testing

```sh
[sudo] npm install testem -g
testem
```

## API

### add(child, [selector, method])

Adds a child view to the view's element.
Optionally define the selector to attach to and the attach method. Will default to `$el` and `append` respectively. 

## Usage

```js
var message = new MessageView;
var reply = new ReplyView;

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
