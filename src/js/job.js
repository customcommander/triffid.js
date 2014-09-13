
/**
 * Job Class
 *
 * @module Triffid
 * @class Triffid.Job
 * @constructor
 * @param name {String} Job name.
 * @param fn {Function} The job itself.
 * @param [context] {Object} The context in which the job executes.
 */
function Job(name, fn, context) {
    this.exec = function () {
        fn.apply(context);
    };
}

Job.prototype = {

    time_start: 0,

    time_end: 0,

    start: function () {
        this.time_start = ( new Date() ).getTime();
    },

    end: function () {
        this.time_end = ( new Date() ).getTime();
    },

    /**
     * Executes the job.
     *
     * @method run
     * @param queue {Queue} The queue which the job belongs to.
     * @public
     */
    run: function (queue) {

        this.start();

        try {
            this.exec();
        } catch (e) {
            if (e instanceof Wait) {

                setTimeout((function (job) {
                    return function () {

                        try {
                            e.fn.apply(e.context);
                        } catch (e) {
                            job.message = e.message;
                        }

                        job.end();
                        queue.next();
                    };
                }(this)), e.delay);

            } else if (e instanceof WaitFor) {

                (function (job){

                    var timer = setInterval((function (job) {
                        return function () {
                            if (e.cond()) {

                                clearInterval(timer);

                                try {
                                    e.fn.apply(e.context);
                                } catch (e) {
                                    job.message = e.message;
                                }

                                job.end();
                                queue.next();
                            }
                        };
                    }(job)), e.repeat);

                })(this);

            } else {
                this.message = e.message;
            }
        }

        this.end();
        queue.next();
    }
};

T.Job = Job;
