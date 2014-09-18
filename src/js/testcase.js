
function TestCase(obj) {
    this.name  = obj.name;
    this.obj   = obj;
    this.initQueue();
}

TestCase.prototype = {

    /**
     * Initialises the queue.
     *
     * @method initQueue
     * @private
     */
    initQueue: function () {
        var self = this;
        var testresult;

        this.queue = new Queue({
            onStart: function () {
                T.console.group(self.name);
            },
            onEnd: function () {
                T.console.info(self.name);
                T.console.groupEnd();
            },
            onJobStart: function (job) {
                testresult = job.name;
            },
            onJobEnd: function (job) {
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

    wait: function (fn, delay) {
        T.wait(fn, delay, this);
    },

    waitFor: function (cond, repeat, fn) {
        T.waitFor(cond, repeat, fn, this);
    },

    run: function () {

        var key;

        this.obj.wait    = this.wait;
        this.obj.waitFor = this.waitFor;

        for (key in this.obj) {
            if (key !== 'wait' && key !== 'waitFor' && typeof this.obj[key] === 'function') {
                this.queue.add(key, this.obj[key], this.obj);
            }
        }

        this.queue.run();
    },

    isFinished: function () {
        return this.queue.isFinished();
    }
};

T.TestCase = TestCase;
