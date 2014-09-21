
/**
 * TestCase Class
 *
 * @module Triffid
 * @class Triffid.TestCase
 * @constructor
 * @param obj {Object} The test case body.
 * @param [obj.quiet=false] {Boolean} If true the test case will be silent and won't output anything.
 * @todo proper check of the obj parameter
 */
function TestCase(obj) {
    this.name = obj.name;
    this.initTestCase(obj);
    this.initQueue();
}

TestCase.prototype = {

    /**
     * Initialises the test case body.
     *
     * @method initTestCase
     * @param obj {Object} Test case body
     * @private
     * @todo proper check
     * @todo throw error if some reserved names were already defined
     */
    initTestCase: function (obj) {

        obj.wait = function (fn, delay) {
            T.wait(fn, delay, this);
        };

        obj.waitFor = function (cond, repeat, fn) {
            T.waitFor(cond, repeat, fn, this);
        };

        obj.init     = typeof obj.init     === 'function' ? obj.init     : function () {};
        obj.setUp    = typeof obj.setUp    === 'function' ? obj.setUp    : function () {};
        obj.tearDown = typeof obj.tearDown === 'function' ? obj.tearDown : function () {};
        obj.destroy  = typeof obj.destroy  === 'function' ? obj.destroy  : function () {};

        this.obj = obj;
    },

    /**
     * Initialises the queue.
     *
     * @method initQueue
     * @private
     */
    initQueue: function () {
        var self = this;

        this.queue = new Queue({
            onStart: self.obj.quiet ? null : function () {
                T.console.group(self.name);
            },
            onEnd: self.obj.quiet ? null : function () {
                T.console.groupEnd();
            },
            onJobEnd: self.obj.quiet ? null : function (job) {
                var testresult = job.name;

                if (!self.isTestName(job.name)) {
                    return;
                }

                if (job.success) {
                    testresult += ': passed.';
                    T.console.pass(testresult);
                } else {
                    testresult += ': ' + job.message;
                    T.console.fail(testresult);
                }
            }
        });
    },

    /**
     * Indicates whether a string represents a valid test name.
     *
     * @method isTestName
     * @param name {String} Candidate string for a test name
     * @return {Boolean}
     * @private
     */
    isTestName: function (name) {

        if (name === 'wait' || name === 'waitFor') {
            return false;
        }

        if (name === 'setUp' || name === 'tearDown') {
            return false;
        }

        if (name === 'init' || name === 'destroy') {
            return false;
        }

        return true;
    },

    /**
     * Runs the test case.
     *
     * @method run
     */
    run: function () {

        var key;

        this.queue.add('init', this.obj.init, this.obj);

        for (key in this.obj) {
            if (typeof this.obj[key] === 'function' && this.isTestName(key)) {
                this.queue.add('setUp'   , this.obj.setUp   , this.obj);
                this.queue.add(key       , this.obj[key]    , this.obj);
                this.queue.add('tearDown', this.obj.tearDown, this.obj);
            }
        }

        this.queue.add('destroy', this.obj.destroy, this.obj);

        this.queue.run();
    },

    /**
     * Indicates whether the test case has finished.
     *
     * @method isFinished
     * @return {Boolean}
     */
    isFinished: function () {
        return this.queue.isFinished();
    }
};
