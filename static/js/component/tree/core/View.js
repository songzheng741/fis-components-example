/**
 * Created by songzheng on 15-4-20.
 */
var utils = require('./Utils');
var Emitter = require('./Emitter');

var noop = function() {};

var View = utils.inherits(Emitter, function(config) {
    var defaults = {
        themes: {
            name:                            false,             //bootstrap风格
            url:                             false,             //css地址
            stripes:                         false,
            responsive:                      false
        },
        animate: false,
        renderFn: noop
    }
    this.config = $.extend(true, defaults, config);

});

View.prototype.render = function(node) {
    var $el = this.config.el;
    if (!node.parentNode) {
        $el.empty();

    }
}

module.exports = View;

