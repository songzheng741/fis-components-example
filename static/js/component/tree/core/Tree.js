"use strict";

var $ = require('jquery');

function Tree(config) {
    var defaults = {plugins: []};

    var config = this.config = $.extend(true, defaults, config);

    this.init();

    var plugins = config['plugins'];

    for (var i = 0; i < plugins.length; i++) {
        var plugin = plugins[i];
        plugin.call(this);

    }
}

$.xtree = {};
$.xtree.plugins = {
    plugins: {},
    registe: function(name, fn) {
        this.plugins[name] = fn;
    }
};



$.fn.xtree = function(config) {
    var $elem = $(this);
    if ($elem.data('xtree')) {
        return $elem.data('xtree');
    } else {
        config = $(true, config, {el: $elem});
        return new Tree(config);
    }
}
