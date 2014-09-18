
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
