Triffid.suite('assert tests')
    .add({
        name: 'standard assertions',

        'test: isTrue()': function () {
            Triffid.Assert.isTrue(true, 'expected true to be true');
        }
    })