var $ = require('jquery');
var utils = require('./Utils');

function Node(props) {
    this.uuid = '';
    this.loaded = false;     //节点是否载入
    this.iconCls = '';       //图标样式
    this.text = '';          //显示文字
    this.parentNode = '';    //父节点
    this.disable = false;    //节点是否不可用
    this.children = [];      //子节点
    this.index = false;      //节点在同层的索引
    this.loaded = false;     //是否加载完成
    this.select = false;     //是否选中
    this.view = false;       //保留view的引用
    this.rendered = false;   //已经渲染

    var me = this;

    $.extend(true, me, props);
}


Node.prototype.data = function($elem) {
    var me = this;

    $elem.data('xtree-node', this);

    if ($elem.is('ul')) {

    }
    if ($elem.is('li')) {
        this.text = $elem.contents().filter(function() {
           if ($.nodeName(this, 'ul')) {
               return false;
           } else {
               return true;
           }
        });
    }

    return this;
}

Node.prototype.add = function(node) {
    if (node instanceof Node) {
        this.children.push(node);
        node.parentNode = this;
    }

    return this;
}

/**
 * 获得节点的深度
 * @param force 是否从新计算树的深度
 * @returns {Number} 树的深度
 */
Node.prototype.getDepth = function(force) {
    if (force || !this.depth) {
        var i = 0;
        var parentNode = this.parentNode;
        while(parentNode != null) {
            i++;
            parentNode = parentNode.parentNode;
        }
        this.depth = i;
        return i;
    } else {
        return this.depth;
    }
}

Node.prototype.getIndex = function(force) {
    var parsetNode = this.parentNode;
    if (parsetNode) {
        for (var i = 0; i < parsetNode.children.length; i++) {
            if (this == parsetNode.children[i]) {
                return i;
            }
        }
    } else {
        return 0;
    }
}

Node.prototype.getPath = function(force) {

}

Node.prototype.refresh = function() {
    this.getDepth(true);
    this.getIndex(true);
}

Node.prototype.isLeaf = function() {
    return !this.children || !this.children.length;
}

Node.prototype.getText = function() {
    return this.text;
}

module.exports = Node;

