/**
 * Created by songzheng on 15-4-20.
 */
var $ = require('jquery');

module.exports = {
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

        /** 因为父类的实例变量已经绑在子类的this上,所以干掉父类的实例变量  **/
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
    }
}