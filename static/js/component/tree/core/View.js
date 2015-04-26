/**
 * Created by songzheng on 15-4-20.
 */
var utils = require('./Utils');
var Emitter = require('./Emitter');

var noop = function() {};

var View = utils.inherits(Emitter, function(config) {
    var defaults = {
        themes: {
            name:                            'bs',             //bootstrap风格
            stripes:                         false,
            responsive:                      false
        },
        animate: false,
        renderFn: function(node) {return node;}
    }
    this.config = $.extend(true, defaults, config);

    var config = this.config;
    var $el = config.el;
    $el.addClass(config.themes.name);
});

View.prototype.render = function(nodes) {
    if (!$.isArray(nodes)) {
        nodes = [nodes];
    }
    for (var i = 0; i < nodes.length; i++) {
        var config = this.config;
        var node = config.renderFn(nodes[i]);
        this._render(node);
    }

}

View.prototype._render = function(node) {

    var parentNode = node.parentNode;
    var $parentUl;
    if (parentNode) {
        var $parentLi = $('#xtree-node-'+parentNode.uuid);
        if ($parentLi.find('>ul').length) {
            $parentUl = $parentLi.find('>ul');
        } else {
            $parentUl = $('<ul class="xtree-sub"></ul>');
            $parentLi.append($parentUl);
        }
    } else {
        $parentUl = this.config.el;
    }

    var $li = $('<li class="xtree-node"></li>').attr('id', 'xtree-node-'+node.uuid);
    for (var j = 0; j < node.getDepth(); j++) {
        $li.append('<span class="xtree-indent"></span>');
    }
    $li.append('<span class=' + node.iconCls + '></span>')
    $li.append('<span class="xtree-title">' + node.text + '</span>');

    $parentUl.append($li);

    this.render(node.children);
}
View.prototype.empty = function() {
    this.config.el.empty();
}


module.exports = View;

