describe("Backbone.Component", function() {

  describe("render", function() {
    var view, child;

    beforeEach(function() {
      view = new Backbone.Component();
      child = new Backbone.Component({ id: 'child' });
    });

    it("should be chainable", function() {
      expect(view.render()).toBe(view);
    });
  });

  describe("append", function() {
    var view, child1, child2;

    beforeEach(function() {
      var CustomView = Backbone.Component.extend({
        render: function() {}
      });

      view = new CustomView();
      child1 = new Backbone.Component({ id: 'child1' });
      child2 = new Backbone.Component({ id: 'child2' });
    });

    it("should be chainable", function() {
      expect(view.append(child1)).toBe(view);
    });

    it("should append its children when rendered", function() {
      view.append(child1);
      view.append(child2);
      view.render();

      expect(view.$el.find('#child1').length).toBe(1);
      expect(view.$el.find('#child2').length).toBe(1);
    });

    it("should not append its children before it is rendered", function() {
      view.append(child1);
      view.append(child2);

      expect(view.$el.find('#child1').length).toBe(0);
      expect(view.$el.find('#child2').length).toBe(0);
    });

    it("should delegate the child's events when rendered", function() {
      spyOn(child1, 'delegateEvents');

      view.append(child1);
      view.render();

      expect(child1.delegateEvents).toHaveBeenCalled();
    });

    it("should add the child element to the correct element", function() {
      view.$el.append('<div id="foo"></div>');
      view.append(child1, '#foo');
      view.render();

      expect(view.$el.find('#foo > #child1').length).toBe(1);
    });
  });

  describe("add", function() {

    it("should alias append", function() {
      var view = new Backbone.Component();
      expect(view.append).toBe(view.add);
    });
  });

  describe("prepend", function() {

    var view, child1, child2;

    beforeEach(function() {
      var CustomView = Backbone.Component.extend({
        render: function() {}
      });

      view = new CustomView();
      child = new Backbone.Component({ id: 'child' });
    });

    it("should prepend its children when rendered", function() {
      view.$el.append('<div id="foo"></div>');
      view.prepend(child);
      view.render();

      expect(view.$el.find('#child:first-child').length).toBe(1);
    });

    it("should not prepend its children before it is rendered", function() {
      view.prepend(child);

      expect(view.$el.find('#child').length).toBe(0);
    });
  });

  describe("render", function() {

    it("should pass arguments", function() {
      var spy = jasmine.createSpy();
      var RenderView = Backbone.Component.extend({
        render: function(a, b) {
          spy(a, b);
        }
      });

      view = new RenderView();
      view.render('a', 'b');

      expect(spy).toHaveBeenCalledWith('a', 'b');
    });
  });

  describe("renderTemplate", function() {
    var compile, template, view;

    describe('with a mocked renderer', function() {
      beforeEach(function() {
        template = jasmine.createSpy();
        compile = jasmine.createSpy().andReturn(template);

        var CustomView = Backbone.Component.extend({
          renderer: { compile: compile },
          template: '<span class="<%= foo %>" />'
        });

        view = new CustomView();
      });

      it("should compile the template", function() {
        view.renderTemplate();

        expect(compile).toHaveBeenCalledWith('<span class="<%= foo %>" />');
      });

      it("should call the compiled template with the passed data", function() {
        var data = { foo: 'bar' };
        view.renderTemplate(data);

        expect(template).toHaveBeenCalledWith(data);
      });
    });

    describe('with the default renderer', function() {
      beforeEach(function() {
        var CustomView = Backbone.Component.extend({
          template: '<span class="<%= foo %>" />'
        });

        view = new CustomView();
      });
      it("should render the template using underscore", function() {
        var data = { foo: 'bar' };
        view.renderTemplate(data);

        expect(view.$('span.bar').length).toBe(1);
      });
    });
  });

  describe("remove", function() {
    var view, child1, child2;

    beforeEach(function() {
      view = new Backbone.Component();
      child1 = new Backbone.Component({ id: 'child1' });
      child2 = new Backbone.Component({ id: 'child2' });
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

    it("should remove itself from its parent", function() {
      view.add(child1);
      child1.remove();

      view.render();
      expect(view.$el.find('#child1').length).toBe(0);
    });
  });
});
