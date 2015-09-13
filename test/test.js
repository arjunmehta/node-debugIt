var debugIt = require('../main');
var test = require('tape').test;

test('Module exported okay', function(t) {
    t.equal(typeof debugIt, 'object');
    t.end();
});

test('Console.log not called before enable', function(t) {

    var debugA;
    var fakeConsole = {
        log: function() {
            t.end(); // should cause a failure if called
        }
    };

    debugA = debugIt.add();

    debugIt.setConsole(fakeConsole);

    debugA('Something', 123, 'Something else');

    t.end();
});

test('Exported Console.log not called before enable', function(t) {

    var moduleA = require('./moduleA');

    var fakeConsole = {
        log: function() {
            t.end(); // should cause a failure if called
        }
    };

    debugIt.setConsole(fakeConsole);

    moduleA.tester();
    t.end();
});


test('Console.log called after enable', function(t) {

    var debugB;
    var fakeConsole = {
        log: function() {
            t.equal(arguments.length, 3);
            t.equal(arguments[0], '\u001b[0;37mdebug\u001b[0m:Something');
            t.equal(arguments[1], 123);
            t.equal(arguments[2], 'Something else');
            t.end();
        }
    };

    debugIt.enable({
        console: fakeConsole
    });

    debugB = debugIt.add();
    debugB('Something', 123, 'Something else');
});


test('Console.log called with name after enable', function(t) {

    var debugC;
    var fakeConsole = {
        log: function() {
            t.equal(arguments.length, 3);
            t.equal(arguments[0], '\u001b[0;36mThis:Is:A:Name\u001b[0m:Something');
            t.equal(arguments[1], 123);
            t.equal(arguments[2], 'Something else');
            t.end();
        }
    };

    debugIt.enable({
        console: fakeConsole
    });

    debugC = debugIt.add('This:Is:A:Name');
    debugC('Something', 123, 'Something else');
});


test('Exported Console.log called with name after enable', function(t) {

    var moduleB = require('./moduleB');
    var fakeConsole = {
        log: function() {
            t.equal(arguments.length, 2);
            t.equal(arguments[0], '\u001b[0;35mModule:B\u001b[0m:testing testing');
            t.equal(arguments[1], 123);
            t.end();
        }
    };

    debugIt.enable({
        console: fakeConsole
    });

    moduleB.tester();
});
