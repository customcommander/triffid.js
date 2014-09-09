
function TestRunner() {
    this.testsuites = [];
    this.queue = new Queue();
}

TestRunner.prototype = {

    suite: function (name) {
        var testsuite = new TestSuite(name);
        this.testsuites.push(testsuite);
        return testsuite;
    },

    run: function () {

        var i,
            testsuite;

        for (i=0; i<this.testsuites.length; i++) {

            testsuite = this.testsuites[i];

            this.queue.add(testsuite.name, function () {
                this.run();
                T.waitFor((function (testsuite) {
                    return function () {
                        testsuite.isFinished();
                    };
                }(this)));
            }, testsuite);
        }

        this.queue.run();
    },

    isFinished: function () {
        return this.queue.empty;
    }
};

T.TestRunner = TestRunner;
