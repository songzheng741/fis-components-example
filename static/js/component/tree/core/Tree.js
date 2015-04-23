"use strict";

var $ = require('jquery');

$.xtree = {
    version: '0.0.1'
};

$.xtree.plugins = {
    plugins: {},
    registe: function(name, fn, defaultConfig) {
        this.plugins[name] = {
            init: fn,
            cfg: defaultConfig
        };
    },
    remove: function(name) {
        delete this.plugins[name];
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


function Tree(config) {
    var defaults = {};

    var config = this.config = $.extend(true, defaults, config);

    this.init();

    var plugins = $.xtree.plugins.plugins;

    for (var name in plugins) {
        var plugin = plugins[name];
        if (plugin.init) {
            plugin.init.call(this, $.extend(true, plugin.cfg, config[name] || {}))
        }
    }

    return this;
}

Tree.prototype.init = function() {

}


