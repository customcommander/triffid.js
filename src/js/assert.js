
/**
 * Standard Assertions
 *
 * @module Triffid
 * @class Triffid.Assert
 * @static
 */
T.Assert = {

    /**
     * Makes sure that the user-defined message is ready to be used as a
     * basis for the final error message.
     *
     * @method initMessage
     * @param message {String} User-defined error message.
     * @return {String}
     * @protected
     */
    initMessage: function (message) {
        return typeof message !== "string" ? "" : message + "\n";
    },

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

        message = this.initMessage(message);
        message+= "Expected true (boolean) but got " + value + " (" + (typeof value) + ") instead.";

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

        message = this.initMessage(message);
        message+= "Expected false (boolean) but got " + value + " (" + (typeof value) + ") instead.";

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

        message = this.initMessage(message);

        try {
            func();
            didnt_throw = true;
        } catch (e) {

            if (typeof err === "function" && !(e instanceof err)) {
                message+= "Error thrown is not from expected constructor.";
                T.fail(message);

            } else if (typeof err === "string" && e.message && e.message !== err) {
                message+= "Expected error message to have been '"+ e.message +"' but got '"+err+"' instead.";
                T.fail(message);
            }
        }

        if (didnt_throw) {
            message+= "Expected an error to have been thrown but it didn't.";
            T.fail(message);
        }
    },

    /**
     * Asserts that a value is a string.
     *
     * @method isString
     * @param value {String} The value to test.
     * @param [message] {String} Failure message should the assertion fails.
     */
    isString: function (value, message) {

        if (typeof value === 'string') {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected a string but got " + value + " (" + (typeof value) + ") instead.";

        T.fail(message);
    },

    /**
     * Asserts that a value is a number.
     *
     * Please note that `NaN`, `Infinity` and `-Infinity` will all pass this test.
     * If you need to exclude these values use `Triffid.Assert.isFiniteNumber()` instead.
     *
     * @example
     *     Triffid.Assert.isNumber(10);        // pass
     *     Triffid.Assert.isNumber('10');      // fail
     *     Triffid.Assert.isNumber(NaN);       // pass
     *     Triffid.Assert.isNumber(Infinity);  // pass
     *     Triffid.Assert.isNumber(-Infinity); // pass
     *
     * @method isNumber
     * @param value {Any} The value to test.
     * @param [message] {String} Additional message to display in case of failure.
     */
    isNumber: function (value, message) {

        if (typeof value === 'number') {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected a number but got " + value + " (" + (typeof value) + ") instead.";

        T.fail(message);
    },

    /**
     * Asserts that a value is a finite number.
     *
     * Same as `Triffid.Assert.isNumber()` but will fail for `NaN`, `Infinity` and `-Infinity`.
     *
     * @example
     *     Triffid.Assert.isNumber(10);        // pass
     *     Triffid.Assert.isNumber('10');      // fail
     *     Triffid.Assert.isNumber(NaN);       // fail
     *     Triffid.Assert.isNumber(Infinity);  // fail
     *     Triffid.Assert.isNumber(-Infinity); // fail
     *
     * @method isFiniteNumber
     * @param value {Any} The value to test.
     * @param [message] {String} Additional message to display in case of failure.
     */
    isFiniteNumber: function (value, message) {

        message = this.initMessage(message);

        if (typeof value !== 'number') {
            message = "Expected a number but got " + value + " (" + (typeof value) + ") instead";
            T.fail(message);

        } else if (value === Infinity) {
            message = "Expected a finite number but got Infinity instead";
            T.fail(message);

        } else if (value === -Infinity) {
            message = "Expected a finite number but got -Infinity instead";
            T.fail(message);

        } else if (isNaN(value)) {
            message = "Expected a finite number but got NaN instead";
            T.fail(message);
        }
    }
};
