
/**
 * Standard Assertions
 *
 * @module Triffid
 * @class Triffid.Assert
 * @static
 */
T.Assert = {

    /**
     * Asserts that a value is true (and not truthy).
     *
     * @example
     *     Triffid.Assert.isTrue(true); // pass
     *     Triffid.Assert.isTrue(1);    // fail
     *
     * @method isTrue
     * @param value {Any} The value to test.
     * @param [message] {String} Failure message should the assertion fails.
     */
    isTrue: function (value, message) {

        if (value === true) {
            return;
        }

        message = message || '';
        message+= "\n";
        message+= "Expected true (boolean) ";
        message+= "but got " + value + " (" + (typeof value) + ") instead.";

        T.fail(message);
    },

    /**
     * Asserts that a value is false (and not falsy).
     *
     * @example
     *     Triffid.Assert.isFalse(false); // pass
     *     Triffid.Assert.isFalse(0);     // fail
     *
     * @method isFalse
     * @param value {Any} The value to test.
     * @param [message] {String} Failure message should the assertion fails.
     */
    isFalse: function (value, message) {

        if (value === false) {
            return;
        }

        message = message || '';
        message+= "\n";
        message+= "Expected false (boolean) ";
        message+= "but got " + value + " (" + (typeof value) + ") instead.";

        T.fail(message);
    },

    /**
     * Asserts that an error is thrown when given function is executed.
     *
     * @example
     *     // Simply checks that a function throws an error: pass
     *     Triffid.Assert.throwsError(function () {
     *         throw new Error();
     *     });
     *
     *     // Checks that the error is of a certain type: pass
     *     Triffid.Assert.throwsError(function () {
     *         throw new MyError();
     *     }, MyError);
     *
     *     // Checks that the error message is the one we expect: pass
     *     Triffid.Assert.throwsError(function () {
     *         throw new Error('bad call');
     *     }, 'bad call');
     *
     * @method throwsError
     * @param func {Function} A function that should throw an error.
     * @param [err] {Function|String} The error constructor or the error message
     * @param [message] {String} Failure message should the assertion fails.
     */
    throwsError: function (func, err, message) {

        var didnt_throw = false;

        try {
            func();
            didnt_throw = true;
        } catch (e) {

            if (typeof err === "function" && !(e instanceof err)) {
                message = message || "";
                message+= "\n";
                message+= "Error thrown is not from expected constructor.";

                T.fail(message);

            } else if (typeof err === "string" && e.message && e.message !== err) {
                message = message || "";
                message+= "\n";
                message+= "Expected error message to have been '"+ e.message +"' ";
                message+= "but got '"+err+"' instead.";

                T.fail(message);
            }
        }

        if (didnt_throw) {
            message = message || "";
            message+= "\n";
            message+= "Expected an error to have been thrown but it didn't.";
            T.fail(message);
        }
    }
};
