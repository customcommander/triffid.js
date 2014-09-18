
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
    }
};
