var debug = require('../main').add('Module:B');

module.exports = {
    tester: function() {
        debug('testing testing', 123);
    }
};
