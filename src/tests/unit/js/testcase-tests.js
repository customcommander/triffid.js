Triffid.suite('test case tests')
    .add({

        name: 'smoke tests',

        'should run all the tests': function () {

            var testcase;
            var counter = 0;

            testcase = new Triffid.TestCase({

                name: 'test1',

                'should run test 1': function () {
                    counter++;
                },

                'should run test 2': function () {
                    counter++;
                },

                'should run test 3': function () {
                    counter++;
                }
            });

            testcase.run();

            this.waitFor(function () { return testcase.isFinished(); }, 50, function () {
                Triffid.Assert.isTrue( 3 === counter, 'expected three tests to have been run');
            });
        }
    });