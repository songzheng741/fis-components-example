/**
 * 提供一个组件代码规范
 * @author songzheng
 */

var $ = require('jquery');

var iris = window.iris = {};
iris.version = '0.0.1';

var noop = function() {};
iris.components = {};

iris.registe = function(name, def) {

    /** 注册成jquery插件 **/
    $.fn[name] = function(config) {
        if ($(this).data(name)) {
            return $(this).data(name);
        }
        return new Component($(this), config)
    };

    /** 定义组件模板类 **/
    function Component(element, config) {

        var $element = this.$element = $(element);
        var defaults = {plugins: []};

        var config = this.config = $.extend(true, defaults, config);

        if ($element) {
            $element.data(name, this);
        }

        this.init();

        var plugins = config.plugins;
        if (plugins) {
            for (var i = 0; i < plugins.length; i++) {
                var plugin = plugins[i];
                if (plugin.init) {
                    $.proxy(plugin.init, this);
                }
            }
        }

        return this;
    }

    /** 定义的组件复写的模板方法 **/
    $.extend(true, Component.prototype, {
        /* 组件初始化模板方法 */
        init: noop,
        /* DOMReady后立即执行 */
        boot: noop,
        on: function(type, selector, callback) {
            return this.$element.on(type, selector, callback);
        },
        off: function(type) {
            return this.$element.off(type);
        },
        trigger: function(type, params) {
            return this.$element.trigger(type, params);
        },
        find: function(selector) {
            return this.$element.find(selector);
        }
    }, def);

    this.components[name] = Component;
}

/** 配置dom加载完毕后要加载的组件 **/
require('./config');


document.bootstrap = function() {
    for (var name in iris.components) {
        var Component = iris.components[name];
        Component.prototype.boot(this);
    }
}

$(function() {
    document.bootstrap();
});

var utils = iris.utils = {};
utils.str2json = function(str, notevil) {
    try {
        if (notevil) {
            return JSON.parse(str
                    //key统统变成双引号包裹
                    .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":';})
                    .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"';})
            );
        } else {
            return (new Function("", "var json = " + str + "; return JSON.parse(JSON.stringify(json));"))();
        }
    } catch(e) { return false; }
};

utils.options = function(string) {

    if ($.isPlainObject(string)) {
        return string;
    }

    var start = (string ? string.indexOf("{") : -1), options = {};

    if (start != -1) {
        try {
            options = iris.str2json(string.substr(start));
        } catch (e) {

        }
    }

    return options;
};

