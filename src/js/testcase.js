
function TestCase(obj) {
    this.name  = obj.name;
    this.obj   = obj;
    this.queue = new Queue();
}

TestCase.prototype = {

    wait: function (fn, delay) {
        T.wait(fn, delay, this);
    },

    waitFor: function (cond, repeat, fn) {
        T.waitFor(cond, repeat, fn, this);
    },

    run: function () {

        var key;

        for (key in this.obj) {
            if (typeof this.obj[key] === 'function') {
                this.queue.add(key, this.obj[key], this);
            }
        }

        this.queue.run();
    },

    isFinished: function () {
        return this.queue.empty;
    }
};

T.TestCase = TestCase;
