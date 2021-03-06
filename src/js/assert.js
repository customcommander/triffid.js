
/**
 * Standard Assertions
 *
 * @module Triffid
 * @class Triffid.Assert
 * @static
 */
var Assert = {

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

        message = this.initMessage(message);

        try {
            func();
        } catch (e) {

            // if err is a function, fail if thrown error is not an instance of that constructor.
            if (typeof err === "function" && !(e instanceof err)) {
                message+= "Error thrown is not from expected constructor.";
                T.fail(message);

            // if err is a string, fail if error message is not that string
            } else if (typeof err === "string" && e.message && e.message !== err) {
                message+= "Expected error message to have been '"+ e.message +"' but got '"+err+"' instead.";
                T.fail(message);
            }

            // if we reached that point if means that the function did throw an
            // error and if we had specific expectations about the error type
            // or message they have been met.
            return;
        }

        // if we reached that point however it means that the function didn't throw at all! bad.
        message+= "Expected function to have thrown an error but it didn't.";
        T.fail(message);
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
    },

    /**
     * Asserts that a value is null.
     *
     * @example
     *     Triffid.Assert.isNull(null);      // pass
     *     Triffid.Assert.isNull(undefined); // fail
     *
     * @method isNull
     * @param value {Any} The value to test.
     * @param [message] {String} Additional message to display in case of failure.
     */
    isNull: function (value, message) {

        if (value === null) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected null but got " + value + " (" + (typeof value) + ") instead";
        T.fail(message);
    },

    /**
     * Asserts that a value is not null.
     *
     * @example
     *     Triffid.Assert.isNotNull(undefined); // pass
     *     Triffid.Assert.isNotNull(null);      // fail
     *
     * @method isNotNull
     * @param value {Any} The value to test.
     * @param [message] {String} Additional message to display in case of failure.
     */
    isNotNull: function (value, message) {

        if (value !== null) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected a non null value";
        T.fail(message);
    },

    /**
     * Asserts that a value is undefined.
     *
     * @example
     *     Triffid.Assert.isUndefined(undefined); // pass
     *     Triffid.Assert.isUndefined(null);      // fail
     *
     * @method isUndefined
     * @param value {Any} The value to test.
     * @param [message] {String} Additional message to display in case of failure.
     */
    isUndefined: function (value, message) {

        var und;

        if (value === und) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected undefined but got " + value + " (" + (typeof value) + ") instead";
        T.fail(message);
    },

    /**
     * Asserts that a value is not undefined.
     *
     * @example
     *     Triffid.Assert.isNotUndefined(null);      // pass
     *     Triffid.Assert.isNotUndefined(undefined); // fail
     *
     * @method isNotUndefined
     * @param value {Any} The value to test.
     * @param [message] {String} Additional message to display in case of failure.
     */
    isNotUndefined: function (value, message) {

        var und;

        if (value !== und) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected a non undefined value";
        T.fail(message);
    },

    /**
     * Asserts that a value is an array.
     *
     * @example
     *     Triffid.Assert.isArray([]); // pass
     *     Triffid.Assert.isArray({}); // fail
     *
     * @method isArray
     * @param value {Any} The value to test.
     * @param [message] {String} Message to display when the assertion fails.
     */
    isArray: function (value, message) {

        // @todo move this kind of things into a util.js file?
        if (Array.isArray && Array.isArray(value)) {
            return;
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected an array but got " + value + " (" + (typeof value) + ") instead";
        T.fail(message);
    },

    /**
     * Asserts that value is a function.
     *
     * @method isFunction
     * @param value {Any} The value to test.
     * @param [message] {String} Message to display if the assertion fails.
     */
    isFunction: function (value, message) {

        if (typeof value === 'function') {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected a function but got " + value + " (" + (typeof value) + ") instead";
        T.fail(message);
    },

    /**
     * Asserts that a value is a date.
     *
     * @method isDate
     * @param value {Any} The value to test.
     * @param [message] {String} Message to display if the assertion fails.
     */
    isDate: function (value, message) {

        if (Object.prototype.toString.call(value) === '[object Date]') {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected a date but got " + value + " (" + (typeof value) + ") instead";
        T.fail(message);
    },

    /**
     * Asserts that a value is a regular expression.
     *
     * @method isRegExp
     * @param value {Any} The value to test.
     * @param [message] {String} Message to display if the assertion fails.
     */
    isRegExp: function (value, message) {

        // @todo move to some kind of enum.
        var re_type = Object.prototype.toString.call(/^foo$/);

        if (Object.prototype.toString.call(value) === re_type) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected a regular expression but got " + value + " (" + (typeof value) + ") instead";
        T.fail(message);
    },

    /**
     * Asserts that a value is neither null nor undefined.
     *
     * @example
     *     Triffid.Assert.isValue(0);         // pass
     *     Triffid.Assert.isValue("");        // pass
     *     Triffid.Assert.isValue(null);      // fail
     *     Triffid.Assert.isValue(undefined); // fail
     *
     * @method isValue
     * @param value {Any} The value to test.
     * @param [message] {String} Message to display if the assertion fails.
     */
    isValue: function (value, message) {

        var und;

        if (value !== null && value !== und) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected a value that is neither undefined nor null ";
        message+= "but got " + value + " (" + (typeof value) + ") instead";
        T.fail(message);
    },

    /**
     * Asserts that a value is NaN.
     *
     * @method isNaN
     * @param value {Any} The value to test.
     * @param [message] {String} Message to display if the assertion fails.
     */
    isNaN: function (value, message) {

        // NaN !== NaN is always true
        // NaN is the only value that doesn't equate to itself.
        if ( value !== value ) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected NaN but got " + value + " (" + (typeof value) + ") instead";
        T.fail(message);
    },

    /**
     * Asserts that a value is not NaN.
     *
     * @method isNotNaN
     * @param value {Any} The value to test.
     * @param [message] {String} Message to display if the assertion fails.
     */
    isNotNaN: function (value, message) {

        // NaN === NaN is always false
        // NaN is the only value that doesn't equate to itself.
        // isNaN() is very very buggy so not using it.
        if ( value === value ) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected a non NaN value but got one :'(";
        T.fail(message);
    },

    /**
     * Asserts that two values are the same.
     *
     * This uses the triple equality so no type coercion can occur.
     *
     * @method areSame
     * @param expected {Any} The expected value.
     * @param value {Any} The value to test.
     * @param [message] {String} Message to display if the assertion fails.
     * @todo throw error when trying to compare NaNs together
     */
    areSame: function (expected, value, message) {

        if (expected === value) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected " + expected + " (" + (typeof expected) + ") ";
        message+= "and " + value + " (" + (typeof value) + ") to have been the same";
        T.fail(message);
    },

    /**
     * Asserts that two are not the same.
     *
     * This uses the triple equality so no type coercion can occur.
     *
     * @method areNotSame
     * @param expected {Any} The expected value.
     * @param valye {Any} The vale to test.
     * @param [message] {String} Message to display if the assertion fails.
     * @todo throw error when trying to compare NaNs together
     */
    areNotSame: function (expected, value, message) {

        if (expected !== value) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected " + expected + " (" + (typeof expected) + ") ";
        message+= "and " + value + " (" + (typeof value) + ") to have been different";
        T.fail(message);
    },

    /**
     * Asserts that a value is an instance of given constructor.
     *
     * @method isInstanceOf
     * @param expected {Function} Expected constructor.
     * @param value {Any} The value to test.
     * @param [message] {String} Message to display if the assertion fails.
     * @todo throw error when expected is not a function
     */
    isInstanceOf: function (expected, value, message) {

        if (value instanceof expected) {
            return;
        }

        message = this.initMessage(message);
        message+= "Expected " + value + " to have been an instance of " + expected;
        T.fail(message);
    }
};
