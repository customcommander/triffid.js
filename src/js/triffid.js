
T.testrunner = new TestRunner();

T.suite = function (name) {
    return T.testrunner.suite(name);
};

T.run = function () {
    T.testrunner.run();
};

