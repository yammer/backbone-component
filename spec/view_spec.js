var View = require('../');

describe("View", function() {
  
  describe("add", function() {
    var view, child;

    beforeEach(function() {
      view = new View;
      child = new View({ id: 'child' });
    });

    it("should be chainable", function() {
      expect(view.add(child)).toBe(view);
    });
    
    it("should add the child element", function() {
      view.add(child);

      spyOn(child, 'render');

      expect(view.$el.find('#child').length).toBe(1);
    });

    it("should add the child element to the correct element", function() {
      view.$el.append('<div id="foo"></div>');
      view.add(child, '#foo');

      expect(view.$el.find('#foo > #child').length).toBe(1);
    });

    it("should use the correct attach method", function() {
      view.$el.append('<div id="foo"><div id="bar"></div></div>');
      view.add(child, '#foo', 'prepend');

      expect(view.$el.find('#foo > #child:first-child').length).toBe(1);
    });

    it("should use append as default attach method", function() {
      view.$el.append('<div id="foo"><div id="bar"></div></div>');
      view.add(child, '#foo');

      expect(view.$el.find('#foo > #child:last-child').length).toBe(1);
    });
  });

  describe("render", function() {
    var view, child1, child2;

    beforeEach(function() {
      view = new View;
      child1 = new View({ id: 'child1' });
      child2 = new View({ id: 'child2' });
    });

    it("should be chainable", function() {
      expect(view.render()).toBe(view);
    });
    
    it("should render all its children", function() {
      spyOn(child1, 'render');
      spyOn(child2, 'render');

      view.add(child1);
      view.add(child2);
      view.render();

      expect(child1.render).toHaveBeenCalled();
      expect(child2.render).toHaveBeenCalled();
    });
  });

  describe("remove", function() {
    var view, child1, child2;

    beforeEach(function() {
      view = new View;
      child1 = new View({ id: 'child1' });
      child2 = new View({ id: 'child2' });
    });

    it("should be chainable", function() {
      expect(view.remove()).toBe(view);
    });
    
    it("should remove all children", function() {
      spyOn(child1, 'remove');
      spyOn(child2, 'remove');

      view.add(child1);
      view.add(child2);
      view.remove();

      expect(child1.remove).toHaveBeenCalled();
      expect(child2.remove).toHaveBeenCalled();
    });

    it("should remove itself from the DOM", function() {
      var div = $('<div></div>');
      div.append(view.$el);
      view.render();
      view.remove();

      expect(div.children().length).toBe(0);
    });
  });
});
