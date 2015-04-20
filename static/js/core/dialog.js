"use strict";

require('./support');
require('./overlay');

var active = false;

iris.registe('dialog', {

    defaults: {
        remote: false,
        width: 600,
        center: true,
        content: '',
        autoShow: true,
        position: {
            left: 0,
            top: 0
        },
        btns: {

        },
        modal: true
    },

    init: function() {
        var me = this;

        var config = this.config = $.extend(true, this.defaults, this.config);

        this.$container = $('<div class="iris-dialog"></div>');
        this.$container.css('width', config.width);
        this.$content = $('<div class="iris-dialog-content"></div>');

        this.$container.height(1000);
        /** head **/
        if (config.title) {
            this.$head = $('<div class="iris-dialog-head"></div>').html('<h2>' + config.title + '</h2>');
            this.$container.append(this.$head);
        }
        /** head **/

        /** content **/
        if (config.remote) {
            this.$content.load(config.remote, $.proxy(function () {
                $.trigger('loaded.iris.dialog');
            }, this));
        } else {
            this.setContent($(config.content));
        }
        this.$container.append(this.$content);
        /** content **/

        /** footer **/
        if (!$.isEmptyObject(config.btns)) {
            this.$footer = $('<div class="iris-dialog-footer"></div>');
            this.$container.append(this.$footer);
        }
        /** footer **/
        if (this.config.modal) {
            this.$overlay = this.$element.overlay();
            this.$overlay.on('click', function() {
                me.hide();
            });
        }
        $('body').append(this.$container);

        // show
        if (config.autoShow) {
            this.show(config.position);
        }

    },

    show: function(position) {

        var me = this;

        if (this.isActive()) {
            return;
        } else if (active) {
            active.hide();
        }

        if (this.$overlay) {
            this.$overlay.show();
        }

        setTimeout(function() { //等待游览器原始渲染，再加class改变样式，否则css transition不会执行, 更好的方式是给html设置一个样式，让其强制渲染
            me.$container.addClass('iris-open');
        }, 0);

        this.$container.attr('aria-dialog-show', 'true');

        this.setPosition();

        if ($.support.transition) {
            this.$container.one($.support.transition.end, function() {
                me.$element.trigger('show.iris.dialog');
            });
        } else {
            this.$element.trigger('show.iris.dialog');
        }

        active = this;

        return this;
    },

    hide: function() {
        var me = this;

        if (!this.isActive()) {
            return;
        }

        this.$container.removeClass('iris-open');

        if (this.$overlay) {
            this.$overlay.hide();
        }
        if ($.support.transition) {
            this.$container.one($.support.transition.end, function() {
                me.$element.trigger('hide.iris.dialog');
            });
        } else {
            this.$element.trigger('hide.iris.dialog');
        }

        active = false;

        if (this.config['autoDestroy']) {
            this.destroy();
        }

        if (this.$overlay && this._isOverflow()) {
            this.$element.height(this._oldHeight);
            $('body').css('padding-right', 0);
            $('body').css('overflow', 'auto');
            this.$overlay.$el.height(this._oldHeight);
        }

        return this;

    },

    setContent: function(content) {
        var _clone = content.detach();
        this.$content.html(_clone);
    },

    setPosition: function(position) {
        if (this.config.center) {
            position = this.getCenterPosition();
        }
        this.$container.css(position);

        if (this.$overlay && this._isOverflow()) {
            this._oldHeight = this.$element.height();
            this.$element.height(this.$container.outerHeight() + this.$container.offset().top + 100);
            $('body').css('padding-right', 0);
            $('body').css('overflow', 'auto');
            this.$overlay.$el.height(this.$container.outerHeight() + this.$container.offset().top + 100);
        }
    },

    _isOverflow: function() {
        return this.$container.outerHeight() + this.$container.position().top
                    > $(window).height();
    },

    getCenterPosition: function() {
        var $win = $(window),
            $elem = this.$element;

        var _top = $win.scrollTop() + ($win.height() + $elem.offset().top - this.$container.outerHeight()) / 2;
        var _left = $win.scrollLeft() + $elem.offset().left + ($elem.width() - this.$container.outerWidth()) / 2;

        if (this._isOverflow()) {
            _top = $win.scrollTop() + $elem.offset().top + 50
        }

        return {top: _top, left: _left};
    },

    resize: function() {
        //todo
    },

    isActive: function() {
        return this == active;
    },

    destroy: function() {
        this.$element.trigger('destroy.iris.dialog');
        this.$container.remove(true);
    }

});


