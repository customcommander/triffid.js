Triffid.suite('assert tests')
    .add({
        name: 'standard assertions',

        'test: isTrue()': function () {
            Triffid.Assert.isTrue(true, 'expected true to be true');
        },

        'test: isFalse()': function () {
            Triffid.Assert.isFalse(false, 'expected false to be false');
        }
    })