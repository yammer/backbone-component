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
      var CustomView = View.extend({
        render: function() {}
      });

      view = new CustomView;
      child1 = new View({ id: 'child1' });
      child2 = new View({ id: 'child2' });
    });

    it("should be chainable", function() {
      expect(view.render()).toBe(view);
    });

    it("should reattach its children", function() {
      view.add(child1);
      view.add(child2);

      view.render();

      expect(view.$el.find('#child1').length).toBe(1);
      expect(view.$el.find('#child2').length).toBe(1);
    });

    it("should delegate the child's events", function() {
      spyOn(child1, 'delegateEvents');

      view.add(child1);
      view.render();

      expect(child1.delegateEvents).toHaveBeenCalled();
    });

    it("should add the child element to the correct element", function() {
      view.$el.append('<div id="foo"></div>');
      view.add(child1, '#foo');
      view.render();

      expect(view.$el.find('#foo > #child1').length).toBe(1);
    });

    it("should use the correct attach method", function() {
      view.$el.append('<div id="foo"><div id="bar"></div></div>');
      view.add(child1, '#foo', 'prepend');
      view.render();

      expect(view.$el.find('#foo > #child1:first-child').length).toBe(1);
    });

    it("should use append as default attach method", function() {
      view.$el.append('<div id="foo"><div id="bar"></div></div>');
      view.add(child1, '#foo');

      view.render();

      expect(view.$el.find('#foo > #child1:last-child').length).toBe(1);
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

    it("should remove itself from it's parent", function() {
      view.add(child1);
      child1.remove();

      view.render();
      expect(view.$el.find('#child1').length).toBe(0);
    });
  });

  describe("removeChildren", function() {
    var view, child1, child2;

    beforeEach(function() {
      view = new View;
      child1 = new View({ id: 'child1' });
      child2 = new View({ id: 'child2' });
    });
    
    it("should remove all of the parent's children", function() {
      spyOn(child1, 'remove');
      spyOn(child2, 'remove');

      view.add(child1);
      view.add(child2);

      view.removeChildren();

      expect(child1.remove).toHaveBeenCalled();
      expect(child2.remove).toHaveBeenCalled();
    });

    it("should be chainable", function() {
      expect(view.removeChildren()).toBe(view);
    });
  });
});
