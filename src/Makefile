all: setup assemble minify

setup:
	mkdir -p ../build/triffid

assemble:
	cat \
		js/intro.js \
		js/console.js \
		js/wait.js \
		js/waitfor.js \
		js/job.js \
		js/queue.js \
		js/assertion-error.js \
		js/assert.js \
		js/testcase.js \
		js/testsuite.js \
		js/testrunner.js \
		js/triffid.js \
		js/outro.js \
			>../build/triffid/triffid.js

#TODO: proper minification when ready
minify:
	cp ../build/triffid/triffid.js ../build/triffid/triffid.min.js

.PHONY: all setup assemble minify
