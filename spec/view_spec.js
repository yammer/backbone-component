var View = require('../');

describe("View", function() {
  
  describe("add", function() {
    var view, child;

    beforeEach(function() {
      view = new View;
      child = new View({ id: 'child' });
    });

    it("should return this instance", function() {
      expect(view.render()).toBe(view);
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
  });

  describe("render", function() {

    it("should return this instance", function() {
      var view = new View;
      expect(view.render()).toBe(view);
    });
    
    it("should render all its children", function() {
      var view1 = new View;
      var view2 = new View({ id: 'view2' });
      var view3 = new View({ id: 'view3' });

      spyOn(view2, 'render');
      spyOn(view3, 'render');

      view1.add(view2);
      view1.add(view3);
      view1.render();

      expect(view2.render).toHaveBeenCalled();
      expect(view3.render).toHaveBeenCalled();
    });
  });
});
