/**
 * Created by songzheng on 15-4-20.
 */
var utils = require('./Utils');
var Emitter = require('./Emitter');

var noop = function() {};

function View(config) {

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

}

View.prototype.render = function(node) {

}


View = utils.inherits(Emitter, View);

module.exports = View;

