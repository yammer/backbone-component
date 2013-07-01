build:
	@browserify index.js > backbone-view.js

test:
	@browserify spec/view_spec.js > specs.js

clean:
	@rm specs.js
