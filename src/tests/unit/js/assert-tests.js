Triffid.suite('assertion suite')
    .add({
        name: 'standard assertions',

        'test: isTrue()': function () {

            Triffid.Assert.isTrue(true, 'expected true to be true');

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.isTrue(1);
            }, null, 'expected failure because 1 (number) is not a boolean');
        },

        'test: isFalse()': function () {

            Triffid.Assert.isFalse(false, 'expected false to be false');

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.isFalse(0);
            }, null, 'expected failure because 0 (number) is not a boolean');

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.isFalse(null);
            }, null, 'expected failure because null is not a boolean');

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.isFalse(undefined);
            }, null, 'expected failure because undefined is not a boolean');

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.isFalse('');
            }, null, 'expected failure because "" (empty string) is not a boolean');
        },

        'test: throwsError()': function () {

            function MyError() {}

            Triffid.Assert.throwsError(function () {
                throw new Error('xxx');
            }, null, 'should have succeeded without the second argument');

            Triffid.Assert.throwsError(function () {
                throw new MyError();
            }, MyError, 'should have succeeded if the error is an instance of given constructor');

            Triffid.Assert.throwsError(function () {
                throw new Error('foobar');
            }, 'foobar', 'should have succeeded if error message matches');

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.throwsError(function () {
                    // empty function intended
                });
            }, null, 'should have failed if the function does not throw an error');

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.throwsError(function () {
                    throw new MyError();
                }, Error);
            }, null,  'should have failed if error is not from expected constructor');

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.throwsError(function () {
                    throw new Error('abc');
                }, 'xyz');
            }, null,  'should have failed if error message does not match');
        },

        'test: isString()': function () {

            Triffid.Assert.isString("foobar", "expected success because 'foobar' is a string");
            Triffid.Assert.isString(""      , "expected success because an empty string is still a string");
            Triffid.Assert.isString(" \r\n ", "expected success because a white space string is still a string");

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.isString([]);
            }, null, "expected failure because an array is not a string");
        },

        'test: isNumber()': function () {

            Triffid.Assert.isNumber(10       , "expected success because 10 is a number");
            Triffid.Assert.isNumber(NaN      , "expected success because NaN is a number, well...");
            Triffid.Assert.isNumber(Infinity , "expected success because Infinity is a number");
            Triffid.Assert.isNumber(-Infinity, "expected success because -Infinity is a number");

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.isNumber('10');
            }, null, "expected failure because '10' (string) is not a number");

            Triffid.Assert.throwsError(function () {
                Triffid.Assert.isNumber([]);
            }, null, "expected failure because an array is not a number");
        }
    })