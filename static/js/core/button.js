

"use strict";

var $ = require('jquery');

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

