# Setup

ROOT_DIR   := $(CURDIR)
BAK_DIR    := $(ROOT_DIR)/bak
SRC_DIR    := $(ROOT_DIR)/lib
TEST_DIR   := $(ROOT_DIR)/spec
NPM_DIR    := $(ROOT_DIR)/node_modules
NPMBIN_DIR := $(NPM_DIR)/.bin

MAIN_FILE  := $(ROOT_DIR)/backbone-component.js
COV_FILE   := $(ROOT_DIR)/coverage.html

# Commands

GIT    := $(shell which git)
NPM    := $(shell which npm)
DOCCO  := $(NPMBIN_DIR)/docco
JSHINT := $(NPMBIN_DIR)/jshint
SAUCIE := $(NPMBIN_DIR)/saucie
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
	@$(TESTEM) ci --launch PhantomJS

testall:
	$(info Running tests...)
	@$(TESTEM) ci --port 8080

testem:
	$(info Running testem...)
	@$(TESTEM)

saucie:
	$(info Running saucie...)
	@$(SAUCIE) --browserNameSL='$(SL_BROWSER)' --versionSL='$(SL_VERSION)' --platformSL='$(SL_PLATFORM)'

doc:
	$(info Generating documentation...)
	@$(DOCCO) $(MAIN_FILE)

pages:
	$(info Updating GitHub pages...)
	@$(GIT) checkout gh-pages
	@$(GIT) merge --no-edit --strategy subtree master
	@$(GIT) push origin gh-pages
	@$(GIT) checkout master

clean:
	$(info Cleaning project...)
	@rm -rf $(COV_FILE)

.PHONY: install lint test testall testem doc pages clean
