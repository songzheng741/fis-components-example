"use strict";

var $ = require('jquery');
var View = require('./View');
var Model = require('./Model');

$.xtree = {
    version: '0.0.1',
    tree_counter: 0,
    tree_cache: {}
}

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
        config = $.extend(true, config, {el: $elem});
        var tree = new Tree(config);
        $elem.data('xtree', tree);
        return tree;
    }
}


function Tree(config) {
    var defaults = {};

    var config = this.config = $.extend(true, defaults, config);

    this.init();

    var plugins = $.xtree.plugins['plugins'];

    for (var name in plugins) {
        var plugin = plugins[name];
        if (plugin.init) {
            plugin.init.call(this, $.extend(true, plugin.cfg, config[name] || {}))
        }
    }

    return this;
}

Tree.prototype.init = function() {
    var config = this.config;
    var $el  = config.el;
    if (!$el) {
        return;
    }

    var model = new Model();

    //渲染html
    if ($.nodeName($el[0], 'ul') || $el.find('ul:first').size()) {
        model.data($el);  //根据html生成model
    } else { //后台加载

    }
}


