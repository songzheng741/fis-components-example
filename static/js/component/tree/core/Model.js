"use strict";

var $ = require('jquery');

var Node = require('./Node');
var utils = require('./Utils');
var Emitter = require('./Emitter');

var noop = function() {};

var Model = utils.inherits(Emitter, function(config) {
    this.root = null;
    this.lazy = false;
    this.url = false;
    this.filter = noop;
    this.loaded = false;
    this.view = false;

    $.extend(true, this, config);

    this.bind();
});

Model.prototype.fetch = function() {

}

Model.prototype.isLazy = function() {

}

Model.prototype.add = function(parentNode, node) {
    this.parentNode.add(node);
}

Model.prototype.delete = function(nodeId) {

}

Model.prototype.update = function(parentNode, node) {

}

/**
 * @param {jquery|Object|String} content
 */
Model.prototype.data = function(content) {

    /** model层加载中 **/
    this.emit('lading.xtree.model', this.root);
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
    /** model层已经准备 **/
    this.emit('ready.xtree.model', this.root);
}

Model.prototype.bind = function() {
    this.on('ready.xtree.model', $.proxy(function() {
        this.view.render(this.root);
    }), this);
}

module.exports = Model;