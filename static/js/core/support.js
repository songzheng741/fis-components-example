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

    $.support.transition = (function() {

        var iris = document.createElement('iris');

        var transitionEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        };

        for (var name in transitionEndEventNames) {
            if (name in iris.style) {
                return {end :transitionEndEventNames[name]};
            }
        }

        return false;

    })();

});