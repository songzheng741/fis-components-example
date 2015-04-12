(function(root, factory) {
    if (typeof define == "function" && define.amd) {
        define('iris', ['jquery'], factory($))
    } else if (exports && typeof exports == 'object') {
        var $ = require('jquery');
        module.exports = factory(root, $);
    } else {
        root.iris = factory(root, $);
    }
})(this, function(root, $) {

    "use strict";

    require('./nav');

});