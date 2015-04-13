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

    var noop = function() {};

    iris.registe('overlay', {
        defaults: {
            'onbeforeshow': noop,
            'onshow': noop,
            'onbeforehide': noop,
            'onhide': noop
        },

        init: function() {
            console.log($.support.transition);
        }
    });

    $(document.body).overlay({

    });

});