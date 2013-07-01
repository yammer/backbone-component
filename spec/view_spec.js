var View = require('../');

describe("View", function() {
  
  describe("adding a child view", function() {
    
    it("should render the child element", function() {
      var view1 = new View;
      var view2 = new View({ id: 'view2' });

      view1.add(view2);
      view1.render();

      expect(view1.$el.find('#view2').length).toBe(1);
    });
  });
});
