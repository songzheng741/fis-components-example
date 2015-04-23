var defaults = {
    icon: '',
    text: ''
}

function Node() {
    this.id = 'node_0';
    this.root = false;       //是否为根节点
    this.isLeaf = false;     //是否为叶子节点
    this.depth = 0;          //此节点所处深度
    this.iconCls = '';       //图标样式
    this.text = '';          //显示文字
    this.parentNode = '';    //父节点
}


Node.prototype.getSiblingNodes = function() {
    if (this.parentNode) {

    }
}

