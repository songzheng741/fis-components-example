"use strict";
var $ = require('jquery');

iris.registe('overlay', {

    defaults: {
        content: '',
        fullscreen: false
    },

    init: function() {
        var config = this.config;

        this.$overlay = $('<div class=""></div>');
        if (config.fullscreen || this.$element.is('body') || this.$element.is('html') || this.$element.isWindow()) {
            this.$overlay.addClass('iris-overlay-fullscreen');
            $('body').append(this.$overlay);
        } else {
            this.$overlay.addClass('iris-overlay');
            $(this.$element).append(this.$overlay);
        }
    },

    show: function() {

        if (!this.$overlay) {
            this.init();
        }

        var $element = this.$element;

        if ($element.attr('aria-overlay-show')) {
            return;
        }


        $element.attr('aria-overlay-show', 'true');
        $element.css('overflow', 'hidden');

        var offset = $element.offset();
        this.$overlay.css({
            width: $element[0].clientWidth,
            height: $element[0].clientHeight
        }).css(offset).addClass('iris-open');

        if ($.support.transition) {
            this.$overlay.one($.support.transition.end, function() {
               $element.trigger('show.overlay.iris');
            });
        } else {
            $element.trigger('show.overlay.iris');
        }
    },

    hide: function() {
        var $element = this.$element;

        if (!$element.attr('aria-overlay-show')) {
            return;
        }

        $element.removeAttr('aria-overlay-show');
        $element.css('overflow', 'auto');

        this.$overlay.removeClass('iris-open');

        if ($.support.transition) {
            this.$overlay.one($.support.transition.end, function() {
                $element.trigger('hide.overlay.iris');
            });
        } else {
            $element.trigger('hide.overlay.iris');
        }

    },

    toggle: function() {
        if (!this.$element.attr('aria-overlay-show')) {
            this.show();
        } else {
            this.hide();
        }
    },

    destroy: function() {
        this.$element.find('iris-overlay').remove(true);
        this.$element.data('overlay', null);
        this.$overlay = null;
    }

});



