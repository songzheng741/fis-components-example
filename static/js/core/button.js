(function(root, factory) {
    if (typeof define == "function" && define.amd) {
        define('iris', [root, 'jquery'], factory(root, $))
    } else if (exports && typeof exports == 'object') {
        var $ = require('jquery');
        module.exports = factory(root, $);
    } else {
        root.iris = factory(root, $);
    }
})(this, function(root, $) {

    "use strict";

    iris.registe('button', {
        defaults: {

        },

        init: function() {
            this._a();
        },
        _a: function() {
            $('a[href="#"]').on('click', function(e) {
                e.preventDefault();
            })
        }
    });

});