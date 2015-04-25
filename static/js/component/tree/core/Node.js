var $ = require('jquery');

function Node(props) {
    this.id = 0;
    this.loaded = false;     //节点是否载入
    this.root = false;       //是否为根节点
    this.isLeaf = false;     //是否为叶子节点
    this.depth = 0;          //此节点所处深度,从0开始
    this.iconCls = '';       //图标样式
    this.text = '';          //显示文字
    this.parentNode = '';    //父节点
    this.disable = false;    //节点是否不可用
    this.children = [];      //子节点
    this.orginElem = '';     //节点原始html元素
    this.index = false;      //节点在同层的索引

    var me = this;

    $.extend(true, me, props);
}


Node.getInstanceFormHtml = function($elem) {
    var options = $elem.data('options');
    var text = $elem.find();
    
}

