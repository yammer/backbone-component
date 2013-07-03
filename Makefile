# Setup

ROOT_DIR   := $(CURDIR)
BAK_DIR    := $(ROOT_DIR)/bak
SRC_DIR    := $(ROOT_DIR)/lib
TEST_DIR   := $(ROOT_DIR)/spec
NPM_DIR    := $(ROOT_DIR)/node_modules
NPMBIN_DIR := $(NPM_DIR)/.bin

MAIN_FILE  := $(ROOT_DIR)/backbone-view.js
COV_FILE   := $(ROOT_DIR)/coverage.html

# Commands

NPM    := $(shell which npm)
JSCOV  := $(shell which jscoverage)
DOCCO  := $(NPMBIN_DIR)/docco
JSHINT := $(NPMBIN_DIR)/jshint
TESTEM := $(NPMBIN_DIR)/testem

# Rules

.SUFFIXES:

all: lint test

install:
	$(info Installing dependencies...)
	@$(NPM) install

lint:
	$(info Linting project files...)
	@$(JSHINT) $(MAIN_FILE)

test:
	$(info Running tests...)
	@$(TESTEM) ci

testem:
	$(info Running testem...)
	@$(TESTEM)

doc:
	$(info Generating documentation)
	@$(DOCCO) $(MAIN_FILE)

clean:
	$(info Cleaning project...)
	@rm -rf $(COV_FILE)

.PHONY: install lint test testem doc clean
