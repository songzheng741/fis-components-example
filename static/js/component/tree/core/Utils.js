/**
 * 常用工具方法
 * @author songzheng
 */
var $ = require('jquery');

module.exports = {
    /**
     * 原形链继承
     * @param Super                     超类
     * @param Sub                       子类
     * @param staticProps               静态变量
     * @returns {Function}              子类构造器
     */
    inherits: function(Super, Sub, staticProps) {

        var Constructor = null;

        if (Sub && typeof Sub === 'function') {
            Sub = Sub;
        } else if (Sub && Sub.hasOwnProperty('constructor')) {
            Sub = Sub.constructor;
        } else {
            staticProps = Sub;
            Sub = Object.constructor;
        }

        Constructor = function() {
            Super.apply(this, arguments);
            Sub.apply(this, arguments);
        }

        // 复制静态方法
        $.extend( true, Constructor, Super, staticProps || {} );

        // 因为父类的实例变量已经绑在子类的this上,所以干掉父类的实例变量
        Constructor.prototype = this.createObject(Super.prototype);

        Constructor.__super__ = Super.prototype;

        return Constructor;
    },

    createObject: function(proto) {
        if (Object.create(proto)) {
            return Object.create(proto);
        } else {
            var Fn = function() {};
            Fn.prototype = proto;
            return new Fn();
        }
    },

    travel: function(tree, callback) {
        var me = this;
        var $ul = $(tree);
        var $node = null;
        $ul.find('>li').each(function(index, elem) {
            $node = $(this);
            callback(index, $node, $ul.parent('li'));
            var $subUl = $node.find('>ul');
            if ($subUl.size()) {
                me.travel($subUl, callback);
            }
        });
    },

    str2json: function(str, notevil) {
        try {
            if (notevil) {
                return JSON.parse(str
                        //key-value统统变成被双引号包裹
                        .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":';})
                        .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"';})
                );
            } else {
                return (new Function("", "var json = " + str + "; return JSON.parse(JSON.stringify(json));"))();
            }
        } catch(e) {
            return false;
        }
    },

    options: function(string) {

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
    }

}