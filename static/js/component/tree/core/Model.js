var jQuery = require('jquery');

var Node = require('./Node');
var noop = function() {};
var utils = require('./Utils');

function Model() {
    this.root = null;
    this.lazy = false;
    this.url = false;
    this.filter = noop;
}

Model.prototype.fetch = function() {

}

Model.prototype.isLazy = function() {

}

Model.prototype.add = function(parentNode, node) {

}

Model.prototype.delete = function(nodeId) {

}

Model.prototype.update = function(parentNode, node) {

}

Model.prototype.read = function(node) {

}

/**
 * @param {jquery|Object|String} content
 */
Model.prototype.data = function(content) {
    if (content instanceof jQuery) {
        var $ul = $.nodeName(content[0], 'ul') ? content : content.find('ul:first');
        utils.travel($ul, function(index, $node, $parent) {

        });


    } else if (typeof content === 'object') {

    } else if (typeof content === 'string') {

    }
}

module.exports = Model;