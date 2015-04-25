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
    this.loaded = false;

    $.extend(true, this, config);
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
    var me = this;
    if (content instanceof $) {
        var $ul = $.nodeName(content[0], 'ul') ? content : content.find('ul:first');
        this.root = new Node({
            'depth': 0,
            'isRoot': true,
            'index': 0,
            'parentNode': null
        }).data($ul);

        utils.travel($ul, function(index, $node, $parentLi) {
            var parsetNode = me.root;
            if ($parentLi.length) {
                parsetNode = $parentLi.data('xtree-node');
            }
            var node = new Node({
                'index': index,
                'parentNode': parsetNode
            }).data($node);
            parsetNode.add(node);
        });
    } else if (typeof content === 'object') {


    } else if (typeof content === 'string') {


    }
}


module.exports = Model;