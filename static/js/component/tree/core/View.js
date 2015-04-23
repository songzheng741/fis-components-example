/**
 * Created by songzheng on 15-4-20.
 */
var utils = require('./Utils');
var Emitter = require('./Emitter');

function View(config) {

}

View.prototype.draw = function() {

}


View = utils.inherits(Emitter, View);

module.exports = View;

