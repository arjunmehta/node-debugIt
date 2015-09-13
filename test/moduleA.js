var debug = require('../main').add('Module:A');

module.exports = {
    tester: function() {
        debug('testing testing', 123);
    }
};
