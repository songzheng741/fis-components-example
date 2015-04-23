function Emitter() {
    this.callbacks = {};
}

Emitter.prototype.on = function(type, callback) {
    if (!this.callbacks[type]) {
        this.callbacks[type] = [];
    }
    this.callbacks[type].push(callback);
}

Emitter.prototype.off = function(type) {
    if (this.callbacks[type]) {
        this.callbacks[type] = [];
    }
}

Emitter.prototype.emit = function(type, params) {
    var callbacks = this.callbacks[type];
    if (callbacks && callbacks.length) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].call(this, params)
        }
    }
}

module.exports = Emitter;
