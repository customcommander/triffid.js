
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
        if (value !== true) {
            throw new Error(message);
        }
    }
};
