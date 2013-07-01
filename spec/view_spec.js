var View = require('../');

describe("View", function() {
  
  describe("adding a child view", function() {
    
    it("should add the child element", function() {
      var view1 = new View;
      var view2 = new View({ id: 'view2' });

      view1.add(view2);
      view1.render();

      spyOn(view2, 'render');

      expect(view1.$el.find('#view2').length).toBe(1);
    });
  });

  describe("rendering", function() {
    
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
