"use strict";
var $ = require('jquery');

iris.registe('overlay', {

    defaults: {
        content: '',
        fullscreen: false
    },

    init: function() {
        var config = $.extend(true, this.defaults, this.config);

        this.$el = this.$overlay = $('<div class=""></div>');
        if (config.fullscreen || this.$element.is('body') || this.$element.is('html') || $.isWindow(this.$element)) {
            this.$overlay.addClass('iris-overlay-fullscreen');
            $('body').append(this.$overlay);
        } else {
            this.$overlay.addClass('iris-overlay');
            $(this.$element).append(this.$overlay);
        }
    },

    show: function() {

        var $body = $('body');

        if (!this.$overlay) {
            this.init();
        }

        var $element = this.$element;

        if ($element.attr('aria-overlay-show')) {
            return;
        }


        $element.attr('aria-overlay-show', 'true');
        this._setScrollbar();
        $body.css('overflow', 'hidden');

        var offset = $element.offset();
        this.$overlay.css({
            width: $element[0].clientWidth,
            height: $element[0].clientHeight
        }).css(offset).addClass('iris-open');

        if ($.support.transition) {
            this.$overlay.one($.support.transition.end, function() {
               $element.trigger('show.iris.overlay');
            });
        } else {
            $element.trigger('show.iris.overlay');
        }

        return this;
    },

    hide: function() {

        var $body = $('body');
        var $element = this.$element;

        if (!$element.attr('aria-overlay-show')) {
            return;
        }

        $element.removeAttr('aria-overlay-show');
        $('body').css('padding-right', 0);
        $body.css('overflow', 'auto');

        this.$overlay.removeClass('iris-open');

        if ($.support.transition) {
            this.$overlay.one($.support.transition.end, function() {
                $element.trigger('hide.iris.overlay');
            });
        } else {
            $element.trigger('hide.iris.overlay');
        }

        return this;
    },

    toggle: function() {
        if (!this.$element.attr('aria-overlay-show')) {
            this.show();
        } else {
            this.hide();
        }

        return this;
    },

    destroy: function() {
        this.$element.find('iris-overlay').remove(true);
        this.$element.data('overlay', null);
        this.$overlay = null;
    },

    _setScrollbar: function() {
        var scrollBarWidth = window.innerWidth - $('body').width();
        if (!scrollBarWidth) {
            return;
        } else {
            $('body').css('padding-right', scrollBarWidth);
        }
    }

});



