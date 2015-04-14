"use strict";
var $ = require('jquery');

var active = false;  //当前激活的modal

var noop = function() {};

iris.registe('modal', {

    defaults: {
        'keyboard': true,
        'center': true,
        'bgclose': true
    },

    init: function() {
        var me = this;

        var config = $.extend(true, this.defaults, this.config);
        this.$html = $(document.documentElement || document.body);

        this.$element.attr('aria-hidden', this.$element.hasClass("iris-open"));

        this.on("click", ".iris-modal-close", function(e) {
            e.preventDefault();
            me.hide();
        }).on("click", function(e) {
            var target = $(e.target);
            if (target[0] == me.$element[0] && config.bgclose) {
                me.hide();
            }
        });
    },

    show: function() {
        if (this.isActive()) {
            return;
        }
        if (active) {
            active.hide();
        }
        active = this;

        this.$html.css('overflow', 'hidden');
        this.$element.addClass("iris-open");

        this.$element.attr('aria-hidden', 'false');
        this.$element.trigger("show.iris.modal");
    },

    hide: function() {
        if (!this.isActive()) {
            return;
        }
        active = false;

        this.$html.css('overflow', 'auto');
        this.$element.removeClass("iris-open");
        this.$element.attr('aria-hidden', 'true');
        this.$element.trigger("hide.iris.modal");

    },

    isActive: function() {
        return this == active;
    }

});


iris.registe('modal-trigger', {
    boot: function() {
        $(document).on('click.modal.iris', '[data-iris-modal]', function(e) {

            var $element = $(this),
                $target = false,
                options = iris.utils.options($element.attr("data-iris-modal"));

            if ($.nodeName(this, 'a')) {
                e.preventDefault();
                $target = $($element.attr('href'));
            } else {
                $target = options.target;
            }

            var Modal = iris.components['modal'];

            if (!$element.data('modal-dialog') && $target) {
                var modal = new Modal($target, options);
                modal.show();
            }

        });
    }
});



