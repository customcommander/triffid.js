
/**
 * Jobs Queue Class
 *
 * @module Triffid
 * @class Triffid.Queue
 * @constructor
 * @param [conf] {Object} A configuration object for the queue.
 * @param [conf.onStart] {Function} Function to execute when the queue starts.
 * @param [conf.onEnd] {Function} Function to execute when the queue ends.
 * @param [conf.onJobStart] {Function} Function to execute when a job in the queue starts.
 * @param [conf.onJobEnd] {Function} Function to execute when a job in the queue ends.
 */
function Queue(conf) {
    this.jobs = [];
    this.initConf(conf);
}

Queue.prototype = {

    /**
     * Indicates whether the queue has started.
     *
     * @property started
     * @type {Number}
     * @private
     */
    started: false,

    /**
     * Indicates whether the queue has ended.
     *
     * @property ended
     * @type {Number}
     * @private
     */
    ended: false,

    /**
     * Reference to the current job.
     *
     * @property job
     * @type {Triffid.Job}
     * @private
     */
    job: null,

    /**
     * Initialises the configuration of the queue.
     *
     * @method initConf
     * @param [conf] {Object}
     * @private
     * @todo proper check
     */
    initConf: function (conf) {
        conf = conf || {};
        conf.onStart    = conf.onStart    || function () {};
        conf.onEnd      = conf.onEnd      || function () {};
        conf.onJobStart = conf.onJobStart || function () {};
        conf.onJobEnd   = conf.onJobEnd   || function () {};
        this.conf = conf;
    },

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
        if (!this.isFinished()) {
            this.conf.onJobEnd(this.job);
            this.run();
        }
    },

    /**
     * Runs the first job in the queue.
     *
     * @method run
     * @public
     */
    run: function () {

        if (!this.isEmpty() && !this.started) {
            this.started = true;
            this.conf.onStart();
        }

        if (this.isEmpty() && this.started) {
            this.ended = true;
            this.conf.onEnd();
            return;
        }

        this.job = this.jobs.shift();
        this.conf.onJobStart(this.job);
        this.job.run(this);
    },

    /**
     * Returns true if there is no job in the queue.
     *
     * @method isEmpty
     * @private
     */
    isEmpty: function () {
        return this.jobs.length === 0;
    },

    /**
     * Returns true when the queue has finished executing all the jobs.
     *
     * @method isFinished
     * @return {Boolean}
     * @public
     */
    isFinished: function () {
        return this.started && this.ended;
    }
};

T.Queue = Queue;
