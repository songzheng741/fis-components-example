"use strict";

var active = false;

iris.registe('dialog', {

    defaults: {
        remote: false,
        width: 600,
        center: true,
        content: '',
        btns: {

        },
        modal: true
    },

    init: function() {

        var config = this.config = $.extend(true, this.defaults, this.config);

        this.$container = $('<div class="iris-dialog"></div>');
        this.$container.css('width', config.width);
        this.$content = $('<div class="iris-dialog-content"></div>');

        if (config.remote) {
            this.$content.load(config.remote, $.proxy(function () {
                $.trigger('loaded.iris.dialog');
            }, this));
        } else {
            this.setContent(this.$element);
        }

        this.$container.append(this.$content);
        if (config.title) {
            this.$head = $('<div class="iris-dialog-head"></div>').html('<h2>' + config.title + '</h2>');
            $('body').append(this.$head);
        }
        $('body').append(this.$container);

        if (!$.isEmptyObject(config.btns)) {
            this.$footer = $('<div class="iris-dialog-footer"></div>');

            $('body').append(this.$footer);
        }

    },

    show: function() {

        if (this.isActive()) {
            return;
        } else {
            active.hide();
        }

        setTimeout(function() {
            this.$container.addClass('iris-open');
        }, 0);

        this.$container.attr('aria-dialog-show', 'true')
    },

    hide: function() {

    },

    setContent: function(content) {
        this.$content.html(content);
    },

    setPosition: function(position) {
        if (this.config.center) {
            position = this.getCenterPosition();
        }
        this.$container.css(position);
    },

    getCenterPosition: function() {
        var _top = ($(window).height() - this.$container.height()) / 2;
        var _left = ($(window).height() - this.$container.height()) / 2;

        return {top: _top, left: _left};
    },

    resize: function() {
        //todo
    },

    isActive: function() {
        return this == active;
    },

    destroy: function() {
        this.$container.remove(true);
    }

});

