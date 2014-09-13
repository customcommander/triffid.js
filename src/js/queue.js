
/**
 * Jobs Queue Class
 *
 * @module Triffid
 * @class Triffid.Queue
 * @constructor
 */
function Queue() {
    this.jobs = [];
}

Queue.prototype = {

    empty: false,

    /**
     * Add a new job to the queue.
     *
     * @method add
     * @param name {String} Job name.
     * @param fn {Function} The job itself.
     * @param [context] {Object} The context in which the job executes.
     * @public
     * @chainable
     */
    add: function (name, fn, context) {
        this.jobs.push( new Job(name, fn, context) );
        return this;
    },

    /**
     * Runs the next job in the queue.
     *
     * @method next
     * @public
     */
    next: function () {
        this.run();
    },

    /**
     * Runs the first job in the queue.
     *
     * @method run
     * @public
     */
    run: function () {

        var job = this.jobs.shift();

        if (!job) {
            this.empty = true;
            return;
        }

        job.run(this);
    }
};

T.Queue = Queue;
