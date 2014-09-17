
function TestSuite(name) {
    this.name      = name;
    this.testcases = [];
    this.queue     = new Queue();
}

TestSuite.prototype = {

    add: function (obj) {
        this.testcases.push( new TestCase(obj) );
        return this;
    },

    run: function () {
        var i;
        var testcase;

        for (i=0; i<this.testcases.length; i++) {

            testcase = this.testcases[i];

            this.queue.add(testcase.name, function () {
                this.run();
                T.waitFor((function (testcase) {
                    return function () {
                        return testcase.isFinished();
                    };
                }(this)));
            }, testcase);
        }

        this.queue.run();
    },

    isFinished: function () {
        return this.queue.isFinished();
    }
};

T.TestSuite = TestSuite;
