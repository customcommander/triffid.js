Triffid.suite('test case suite')
    .add({

        name: 'a test',

        'is a function which name contains space(s) or starts with the word "test"': function () {

            var flag = '';
            var testcase = new Triffid.TestCase({

                quiet: true,

                'test_something': function () {
                    flag += 'a';
                },

                'this is also a test': function () {
                    flag += 'b';
                },

                'this_is_not_a_test': function () {
                    flag += 'err';
                }
            });

            testcase.run();

            Triffid.Assert.isTrue('ab' === flag, 'expected such function to have been called');
        }
    })
    .add({

        name: 'smoke tests',

        'should run all the tests': function () {

            var testcase;
            var counter = 0;

            testcase = new Triffid.TestCase({

                quiet: true,

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

                quiet: true,

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
        },

        'should run `setUp` and `tearDown` before and after each test': function () {

            var flag = '';

            var testcase = new Triffid.TestCase({

                quiet: true,

                setUp: function () {
                    flag += 'A';
                },

                tearDown: function () {
                    flag += 'B';
                },

                test1: function () {
                    flag += '1';
                },

                test2: function () {
                    flag += '2';
                },

                test3: function () {
                    flag += '3';
                }
            });

            testcase.run();

            this.waitFor(function () { return testcase.isFinished(); }, 50, function () {
                Triffid.Assert.isTrue('A1BA2BA3B' === flag,
                    'expected setUp and tearDown to have run before and after each test');
            });
        },

        'should run `init` and `destroy` before and after the test case': function () {

            var flag = '';

            var testcase = new Triffid.TestCase({

                quiet: true,

                init: function () {
                    flag += '000';
                },

                destroy: function () {
                    flag += '999';
                },

                setUp: function () {
                    flag += 'A';
                },

                tearDown: function () {
                    flag += 'B';
                },

                test1: function () {
                    flag += '1';
                },

                test2: function () {
                    flag += '2';
                },

                test3: function () {
                    flag += '3';
                }
            });

            testcase.run();

            this.waitFor(function () { return testcase.isFinished(); }, 50, function () {
                Triffid.Assert.isTrue('000A1BA2BA3B999' === flag,
                    'expected init and destroy to have run before and after the test case');
            });
        }
    });