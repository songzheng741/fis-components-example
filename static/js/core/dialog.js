"use strict";

iris.registe('dialog', {

    defaults: {
        remote: false,
        width: 600,
        modal: true,
        content: '',
        btns: {}
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

        this.$head = $('<div class="iris-dialog-head"></div>');
        this.$content = $('<div class="iris-dialog-content"></div>');
        this.$footer = $('<div class="iris-dialog-footer"></div>');
    },

    show: function() {

    },

    hide: function() {

    },

    setContent: function() {
        var config = this.config;
    }

});

