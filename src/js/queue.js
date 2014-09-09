
function Queue() {
    this.jobs = [];
}

Queue.prototype = {

    empty: false,

    add: function (name, fn, context) {
        this.jobs.push( new Job(name, fn, context) );
        return this;
    },

    next: function () {
        this.run();
    },

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
