# Before anything else
THIS_FILE := $(lastword $(MAKEFILE_LIST))
NODE := $(shell command -v node 2> /dev/null)
MYSHELL := $(shell echo $$SHELL)
UNAME_S := $(shell uname -s)

.PHONY: run build android ios

help:
	@echo "Available Targets:"
	@cat Makefile | egrep '^([-a-zA-Z]+?):' | sed 's/:\(.*\)//g' | sed 's/^/- /g'

setup-node:
ifeq ($(UNAME_S),Darwin) # if MAC
ifneq (,$(findstring node,$(NODE)))
	@echo "Node already installed"
else
	@echo "Installing node..."
	brew update && brew install node
endif
	@echo "Installing node dependencies with yarn..."
	yarn
else
	@echo "Please read DEVELOPMENT docs to install node on this SO"
	exit 1
endif # end MAC

setup-serverless:
	npm install -g serverless
	sls dynamodb install

setup: setup-node setup-serverless

delete-node-modules:
	rm -rf node_modules

reset: delete-node-modules setup

lint:
	npm run lint

lint-fix:
	npm run lint-fix

run:
	sls offline --noEnvironment

dynamo:
	sls dynamodb start --migrate

deploy:
	serverless deploy -v

invoke-function:
	serverless invoke local --function $(FUNC)

deploy-function:
	serverless deploy function -f $(FUNC)

test:
	npm test
