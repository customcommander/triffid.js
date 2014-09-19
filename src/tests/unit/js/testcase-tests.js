Triffid.suite('test case suite')
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
        },

        'should wait for a test to finish before running another': function () {

            var testcase;
            var flag = '';

            testcase = new Triffid.TestCase({

                name: 'test2',

                'test 1': function () {
                    this.wait(function () { flag += 'a'; }, 1000);
                },

                'test 2': function () {
                    this.wait(function () { flag += 'b'; }, 500);
                },

                'test 3': function () {
                    this.wait(function () { flag += 'c'; }, 250);
                }
            });

            testcase.run();

            this.waitFor(function () { return testcase.isFinished(); }, 50, function () {
                Triffid.Assert.isTrue( 'abc' === flag, 'expected tests to have run sequentially' );
            });
        }
    });