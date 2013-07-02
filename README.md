# Bacbone View

Base view for yamjs components.

## Testing

  [sudo] npm install testem -g
  testem

## API

### add(child, [selector, method])

Adds a child view to the view's element.

### remove()

Removes itself and all child views from the DOM and removes any bound events.

## Usage

```js
var view = new View;
var child = new View;

view.add(child);

view.render();
child.render();
```

Will render:

```html
<div class="parent">
  <div class="child">
  </div>
</div>
```
