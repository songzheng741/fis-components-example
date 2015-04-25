var $ = require('jquery');
var utils = require('./Utils');

function Node(props) {
    this.id = 0;
    this.loaded = false;     //节点是否载入
    this.root = false        //是否为根节点
    this.isLeaf = false;     //是否为叶子节点
    this.depth = false;      //此节点所处深度,从0开始
    this.iconCls = '';       //图标样式
    this.text = '';          //显示文字
    this.parentNode = '';    //父节点
    this.disable = false;    //节点是否不可用
    this.children = [];      //子节点
    this.orginElem = '';     //节点原始html元素
    this.index = false;      //节点在同层的索引
    this.loaded = false;     //是否加载完成
    this.select = false;     //是否选中
    this.view = false;       //保留view的引用

    var me = this;

    $.extend(true, me, props);
}


Node.prototype.data = function($elem) {
    this.orginElem = $elem;

    $elem.data('xtree-node', this);

    if ($elem.is('ul')) {

    }
    if ($elem.is('li')) {

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
Node.prototype.depth = function(force) {
    if (force || !this.depth) {
        var i = 0;
        var parentNode = this.parentNode;
        while(parentNode != null) {
            i++;
            parentNode = this.parentNode;
        }
        return i;
    } else {
        return this.depth;
    }
}

module.exports = Node;

