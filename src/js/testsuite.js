
/**
 * TestSuite Class
 *
 * @module Triffid
 * @class Triffid.TestSuite
 * @constructor
 * @param name {String} Name of the suite
 */
function TestSuite(name) {
    this.name      = name;
    this.testcases = [];
    this.queue     = new Queue();
}

TestSuite.prototype = {

    /**
     * Adds a test case to the suite.
     *
     * @method add
     * @param obj {Object}
     */
    add: function (obj) {
        this.testcases.push( new TestCase(obj) );
        return this;
    },

    /**
     * Runs the test suite.
     *
     * @method run
     */
    run: function () {
        var i;
        var testcase;

        for (i=0; i<this.testcases.length; i++) {

            testcase = this.testcases[i];

            this.queue.add(testcase.name, function () {
                this.run();
                T.waitFor((function (testcase) {
                    return function () {
                        return testcase.isFinished();
                    };
                }(this)));
            }, testcase);
        }

        this.queue.run();
    },

    /**
     * Indicates whether the test suite has finished.
     *
     * @method isFinished
     * @return {Boolean}
     */
    isFinished: function () {
        return this.queue.isFinished();
    }
};
