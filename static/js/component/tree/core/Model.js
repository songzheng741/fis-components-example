"use strict";

var $ = require('jquery');

var Node = require('./Node');
var utils = require('./Utils');

var noop = function() {};


function Model(config) {
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
    if (content instanceof $) {
        var $ul = $.nodeName(content[0], 'ul') ? content : content.find('ul:first');
        this.root = Node.getInstanceFormHtml($ul);

        utils.travel($ul, function(index, $node, $parent) {
            //console.log($node[0].tagName);

        });

    } else if (typeof content === 'object') {


    } else if (typeof content === 'string') {


    }
}


module.exports = Model;