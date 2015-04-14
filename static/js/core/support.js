

"use strict";

var $ = require('jquery');

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

