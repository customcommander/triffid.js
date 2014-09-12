
/**
 * Test Class
 *
 * @module Triffid
 * @class Triffid.Test
 * @constructor
 * @param name {String} The name of the test. e.g. 'Should return a if b'
 * @param context {Object} The test case context which the test belongs to.
 */
function Test(name, context) {
    this.name    = name;
    this.context = context;
    this.initContext();
    this.initQueue();
}

Test.prototype = {

    /**
     * @method initContext
     * @private
     */
    initContext: function () {

        this.context.setUp = (typeof this.context.setUp === 'function') ?
            this.context.setUp :
            function () {
                // empty function intended.
            };

        this.context.tearDown = (typeof this.context.tearDown === 'function') ?
            this.context.tearDown :
            function () {
                // empty function intended.
            };

        this.context.wait = function (fn, delay) {
            T.wait(fn, delay, this);
        };

        this.context.waitFor = function (cond, repeat, fn) {
            T.waitFor(cond, repeat, fn, this);
        };
    },

    /**
     * @method initQueue
     * @private
     */
    initQueue: function () {
        this.queue = new Queue();
        this.queue.add('setUp'   , this.context.setUp     , this.context);
        this.queue.add(this.name , this.context[this.name], this.context);
        this.queue.add('tearDown', this.context.tearDown  , this.context);
    },

    /**
     * Runs the test.
     *
     * @method run
     * @public
     */
    run: function () {
        this.queue.run();
    },

    /**
     * Indicates whether the test has finished to execute.
     *
     * @method isFinished
     * @public
     * @return {Boolean}
     */
    isFinished: function () {
        return this.queue.empty;
    }
};
