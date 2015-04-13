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

    iris.registe('modal', {

        defaults: {
            'keyboard': true,
            'center': true
        },

        init: function() {

        }
    });

    $(document.body).overlay({

    });

});