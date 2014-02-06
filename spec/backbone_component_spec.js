describe('Backbone.Component', function() {

  describe('add', function() {
    var view;

    beforeEach(function() {
      view = new Backbone.Component();
    });

    it('should alias append', function() {
      expect(view.append).toBe(view.add);
    });
  });

  describe('append', function() {
    var view, child1, child2;

    beforeEach(function() {
      var CustomView = Backbone.Component.extend({
        render: function() {}
      });

      view = new CustomView();
      child1 = new Backbone.Component({ id: 'child1' });
      child2 = new Backbone.Component({ id: 'child2' });
    });

    it('should be chainable', function() {
      expect(view.append(child1)).toBe(view);
    });

    it('should append its children when rendered', function() {
      view.append(child1);
      view.append(child2);
      view.render();

      expect(view.$el.find('#child1').length).toBe(1);
      expect(view.$el.find('#child2').length).toBe(1);
    });

    it('should not append its children before it is rendered', function() {
      view.append(child1);
      view.append(child2);

      expect(view.$el.find('#child1').length).toBe(0);
      expect(view.$el.find('#child2').length).toBe(0);
    });

    it('should delegate the child\'s events when rendered', function() {
      spyOn(child1, 'delegateEvents');

      view.append(child1);
      view.render();

      expect(child1.delegateEvents).toHaveBeenCalled();
    });

    it('should add the child element to the correct element', function() {
      view.$el.append('<div id="foo"></div>');
      view.append(child1, '#foo');
      view.render();

      expect(view.$el.find('#foo > #child1').length).toBe(1);
    });
  });

  describe('prepend', function() {
    var view, child1, child2;

    beforeEach(function() {
      var CustomView = Backbone.Component.extend({
        render: function() {}
      });

      view = new CustomView();
      child1 = new Backbone.Component({ id: 'child1' });
      child2 = new Backbone.Component({ id: 'child2' });
    });

    it('should be chainable', function() {
      expect(view.prepend(child1)).toBe(view);
    });

    it('should prepend its children when rendered', function() {
      view.$el.append('<div id="foo"></div>');
      view.prepend(child1);
      view.prepend(child2);
      view.render();

      expect(view.$el.find('#child2:first-child').length).toBe(1);
    });

    it('should not prepend its children before it is rendered', function() {
      view.prepend(child1);
      view.prepend(child2);

      expect(view.$el.find('#child2').length).toBe(0);
    });
  });

  describe('children', function() {
    var view, child1, child2;

    beforeEach(function() {
      var CustomView = Backbone.Component.extend({
        render: function() {}
      });

      view = new CustomView();
      child1 = new Backbone.Component({ id: 'child1' });
      child2 = new Backbone.Component({ id: 'child2' });
    });

    it('should return the list of children', function() {
      view.add(child1);
      view.add(child2);

      expect(view.children()).toEqual([child1, child2]);
    });
  });

  describe('empty', function() {
    var view, child1, child2;

    beforeEach(function() {
      var CustomView = Backbone.Component.extend({
        render: function() {}
      });

      view = new CustomView();
      child1 = new Backbone.Component({ id: 'child1' });
      child2 = new Backbone.Component({ id: 'child2' });
    });

    it('should be chainable', function() {
      expect(view.empty()).toBe(view);
    });

    it('should remove all children', function() {
      view.$el.append('<div id="foo"></div>');
      view.add(child1);
      view.add(child2);
      view.render();

      expect(view.$el.find('#child1').length).toBe(1);
      expect(view.$el.find('#child2').length).toBe(1);

      view.empty();

      expect(view.$el.find('#child1').length).toBe(0);
      expect(view.$el.find('#child2').length).toBe(0);
    });

    describe('with non-Backbone.Component children', function() {
      var child3;
      beforeEach(function() {
        var NotBackboneComponent = Backbone.View.extend({});

        child3 = new NotBackboneComponent({ id: 'child3' });
      });

      it('should remove all children', function() {
        view.add(child3);
        view.render();

        expect(view.$el.find('#child3').length).toBe(1);
        expect(view._children.length).toBe(1);

        view.empty();

        expect(view.$el.find('#child3').length).toBe(0);
        expect(view._children.length).toBe(0);
      });
    });
  });

  describe('render', function() {
    var view, child;

    beforeEach(function() {
      var CustomView = Backbone.Component.extend({
        render: function() {}
      });

      view = new CustomView();
      child = new Backbone.Component({ id: 'child' });
    });

    it('should be chainable', function() {
      expect(view.render()).toBe(view);
    });

    it('should pass arguments', function() {
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

  describe('renderTemplate', function() {
    var compile, template, view;

    describe('with the default renderer', function() {
      beforeEach(function() {
        var CustomView = Backbone.Component.extend({
          template: '<span class="<%= foo %>" />'
        });

        view = new CustomView();
      });

      it('should render the template using underscore', function() {
        var data = { foo: 'bar' };
        view.renderTemplate(data);

        expect(view.$('span.bar').length).toBe(1);
      });

      it('should only compile the template once', function() {
        spyOn(_, 'template').andCallThrough();

        var data = { foo: 'bar' };
        view.renderTemplate(data);


        expect(_.template.callCount).toBe(1);
      });
    });

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

      it('should compile the template', function() {
        view.renderTemplate();

        expect(compile).toHaveBeenCalledWith('<span class="<%= foo %>" />');
      });

      it('should call the compiled template with the passed data', function() {
        var data = { foo: 'bar' };
        view.renderTemplate(data);

        expect(template).toHaveBeenCalledWith(data);
      });
    });

    describe('with child views', function() {
      var model;

      beforeEach(function() {
        var CustomParentView = Backbone.Component.extend({
          template: '<p class="parent"></p>',

          initialize: function () {
            this.listenTo(this.model, 'change', this.render);
          },

          render: function () {
            return this.renderTemplate();
          }
        });

        var CustomChildView = Backbone.Component.extend({
          template: '<p class="child"></p>',

          render: function () {
            return this.renderTemplate();
          }
        });

        model = new Backbone.Model();
        view  = new CustomParentView({ model: model });
        view.append(new CustomChildView());
        view.append(new CustomChildView());
      });

      it('should re-render the children correctly', function() {
        view.render();
        model.set({ foo: 'bar' });
        expect(view.$('p.child').length).toBe(2);
      });
    });
  });

  describe('remove', function() {
    var view, child1, child2;

    beforeEach(function() {
      var CustomView = Backbone.Component.extend({
        remove: function() {}
      });

      view = new CustomView();
      child1 = new Backbone.Component({ id: 'child1' });
      child2 = new Backbone.Component({ id: 'child2' });
    });

    it('should be chainable', function() {
      expect(view.remove()).toBe(view);
    });

    it('should remove all children', function() {
      spyOn(child1, 'remove');
      spyOn(child2, 'remove');

      view.add(child1);
      view.add(child2);
      view.remove();

      expect(child1.remove).toHaveBeenCalled();
      expect(child2.remove).toHaveBeenCalled();
    });

    it('should remove itself from the DOM', function() {
      var div = $('<div></div>');
      div.append(view.$el);
      view.render();
      view.remove();

      expect(div.children().length).toBe(0);
    });

    it('should remove itself from its parent', function() {
      view.add(child1);
      child1.remove();

      view.render();
      expect(view.$el.find('#child1').length).toBe(0);
    });
  });

  describe('removing with children and grandchildren', function () {

    it('removing a child should not cause the grandparent to lose the parent as a child', function () {
      var grandparent = new Backbone.Component({ id: 'grandparent' });
      var parent = new Backbone.Component({ id: 'parent' });
      var child = new Backbone.Component({ id: 'child' });

      spyOn(parent, 'render');

      grandparent.add(parent);
      parent.add(child);

      child.remove();

      // The grandparent should still be aware of the parent (and so
      // call its `render` method)
      grandparent.render();

      expect(parent.render).toHaveBeenCalled();
    });

  });

});
