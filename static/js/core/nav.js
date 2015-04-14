
"use strict";

var $ = require('jquery');

iris.registe('nav', {
    defaults: {
        target: '.iris-nav',
        navItem: 'a[href="#"]',
        toggle: '.has-child',
        lists: 'ul',
        openArrowClass: 'iris-icon-chevron-right',
        closeArrowClass: 'iris-icon-arrow-bottom',
        animate: true
    },

    /**
     * @param context document node
     * @this Component.prototype
     */
    boot: function(context) {
        var me = this;
        /** Fn 这个component构造器 **/
        var Fn = this.constructor;
        var $element = $(this.defaults.target, context);
        if ($element.data('nav')) {
            return;
        } else {
            $element.each(function() {
                new Fn($(this), me.defaults);
            });
        }
    },

    init: function() {

        var me = this;

        var config = this.config,
            $toggle = this.find(config.toggle),
            $item = this.find(config.navItem),
            $child = this.find(config.lists);

        this._addArrow();


        /**
         * 1. 点击a时
         *    1.1 激活父li
         *        1.1.1 leaf节点添加active类
         *        1.1.2 如果.has-child,展开子节点
         *    1.2 关闭其他同级li
         */
        this.on("click.iris.nav", config.navItem, function(e) {
            var $a = $(this),
                $li = $a.parent();

            e.preventDefault();
            if ($li.hasClass('active')) {
                return;
            }
            $a.trigger('select.iris.nav', this);

            /** 删除所有节点的actvie状态 **/
            me.find(config.navItem).parents().removeClass('active');
            /** 激活当前li **/
            $li.addClass('active');
            me.getParents($li).addClass('active');
        });
    },

    /**
     * 获得父类路径
     */
    getParents: function($li) {
        return $li.parents('.has-child');
    },
    _addArrow: function() {
        var config = this.config;
        var $i = $('<i class=" ' + config.openArrowClass  + ' pull-right"></i>');
        this.find(this.defaults.toggle + ' > a').append($i);
    }
});

