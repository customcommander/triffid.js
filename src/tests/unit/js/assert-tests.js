Triffid.suite('assert tests')
    .add({
        name: 'standard assertions',

        'test: isTrue()': function () {
            Triffid.Assert.isTrue(true, 'expected true to be true');
        },

        'test: isFalse()': function () {
            Triffid.Assert.isFalse(false, 'expected false to be false');
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
        }
    })