var _console = console;
var enabled = false;

var noop = function() {};
var colors = ['0;34', '0;32', '0;36', '0;31', '0;35', '0;33', '0;37', '1;30', '1;34', '1;32', '1;36', '1;31', '1;35', '1;33'];


function genDebugClosure(namespaceName) {

    var debug;
    var colorCode;
    
    namespaceName = namespaceName || 'debug';

    colorCode = generateColorCode(namespaceName);

    if (enabled === true) {
        debug = function() {
            arguments[0] = colorCode + namespaceName + '\u001b[0m:' + arguments[0];
            _console.log.apply(_console, Array.prototype.slice.call(arguments));
        };
    } else {
        debug = noop;
    }

    return debug;
}

function generateColorCode(s) {
    
    var i;
    var l = s.length;

    for (i = 0; i < s.length; i++) {
        l += s.charCodeAt(i);
    }

    return '\u001b[' + colors[l % colors.length] + 'm';
}

module.exports = {

    add: function(namespaceName) {
        return genDebugClosure(namespaceName);
    },

    enable: function(options) {
        options = options || {};

        enabled = true;

        if (options.console) {
            _console = options.console;
        }

        return this;
    },

    setConsole: function(newConsole) {
        _console = newConsole;
    }
};
