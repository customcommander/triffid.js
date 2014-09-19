
/**
 * TestRunner Class
 *
 * @module Triffid
 * @class Triffid.TestRunner
 * @constructor
 */
function TestRunner() {
    this.testsuites = [];
    this.queue = new Queue();
}

TestRunner.prototype = {

    /**
     * Adds a suite to the test runner.
     *
     * @method suite
     * @param name {String} The name of the test suite.
     * @return {Triffid.TestSuite}
     */
    suite: function (name) {
        var testsuite = new TestSuite(name);
        this.testsuites.push(testsuite);
        return testsuite;
    },

    /**
     * Runs the test runner.
     *
     * @method run
     */
    run: function () {

        var i,
            testsuite;

        for (i=0; i<this.testsuites.length; i++) {

            testsuite = this.testsuites[i];

            this.queue.add(testsuite.name, function () {
                this.run();
                T.waitFor((function (testsuite) {
                    return function () {
                        return testsuite.isFinished();
                    };
                }(this)));
            }, testsuite);
        }

        this.queue.run();
    },

    /**
     * Indicates whether the test runner has finished.
     *
     * @method isFinished
     * @return {Boolean}
     */
    isFinished: function () {
        return this.queue.isFinished();
    }
};
