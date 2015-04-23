var Node = require('./Node');
var noop = function() {};

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

module.exports = Model;