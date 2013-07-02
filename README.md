# Bacbone View

A thin layer on top of Backbone's view class to add nested child views.

## Testing

  [sudo] npm install testem -g
  testem

## API

### add(child, [selector, method])

Adds a child view to the view's element.

## Usage

```js
var message = new Message;
var reply = new Reply;

message.add(reply);

message.render();
reply.render();
```

Will render:

```html
<div class="message">
  <div class="reply">
  </div>
</div>
```
