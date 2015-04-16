"use strict";

var active = false;

iris.registe('dialog', {

    defaults: {
        remote: false,
        width: 600,
        content: '',
        btns: {

        },
        modal: true
    },

    init: function() {

        var config = this.config = $.extend(true, this.defaults, this.config);

        this.$container = $('<div class="iris-dialog"></div>');
        this.$content = $('<div class="iris-dialog-content"></div>');

        if (config.remote) {
            this.$content.load(config.remote, $.proxy(function () {
                $.trigger('loaded.iris.dialog');
            }, this));
        } else {
            this.setContent(this.content);
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

        this.$container.addClass('iris-open');
        this.$container.attr('aria-dialog-show', 'true')
    },

    hide: function() {

    },

    setContent: function() {
        var config = this.config;
    },

    setPosition: function() {

    },

    isActive: function() {
        return this == active;
    }

});

