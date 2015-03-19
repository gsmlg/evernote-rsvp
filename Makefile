npm=$(which npm)
.PHONY: clean build

all: clean build

install: $(npm)
	@npm install
	@npm isttall -g broccoli-cli

build: $(npm)
	@broccoli build lib

publish: $(npm)
	@npm publish

clean:
	@rm -rf lib
	@rm -rf tmp

