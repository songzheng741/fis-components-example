

"use strict";

var $ = require('jquery');

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

