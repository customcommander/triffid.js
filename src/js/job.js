
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
                job.message = e.message;
            }
        }

        this.end();
        queue.next();
    }
};

T.Job = Job;
