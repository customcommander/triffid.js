
/**
 * Triffid
 *
 * @class Triffid
 * @static
 */

T.testrunner = new TestRunner();

T.suite = function (name) {
    return T.testrunner.suite(name);
};

T.run = function () {
    T.testrunner.run();
};

T.console = new BrowserConsole();

/**
 * Throws an AssertionError.
 *
 * @for Triffid
 * @method fail
 * @param message {String} The error message.
 * @static
 */
T.fail = function (message) {
    throw new AssertionError(message);
};

/**
 * Stops the execution of a job and resumes after a delay.
 *
 * @for Triffid
 * @method wait
 * @param fn {Function} The function to execute when the job can resume.
 * @param [delay=50] {Number} Time in ms to wait before attempting to resume.
 * @param [context] {Object} Context in which the function should execute.
 * @static
 */
T.wait = function (fn, delay, context) {
    throw new Wait(fn, delay, context);
};

/**
 * Stops the execution of a job and resumes until given condition is met.
 *
 * @for Triffid
 * @method waitFor
 * @param cond {Function} A function that returns true when the job can resume.
 * @param repeat {Number} Interval in ms after which we check whether the condition is met.
 * @param fn {Function} The function to execute when the job can resume.
 * @param [context] {Object} The context in which the function should execute.
 * @static
 */
T.waitFor = function (cond, repeat, fn, context) {
    throw new WaitFor(cond, repeat, fn, context);
};

T.Wait       = Wait;
T.WaitFor    = WaitFor;
T.Job        = Job;
T.Queue      = Queue;
T.Assert     = Assert;
T.TestCase   = TestCase;
T.TestSuite  = TestSuite;
T.TestRunner = TestRunner;
