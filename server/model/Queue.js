"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        this.list = [];
    }
    Queue.prototype.Next = function () {
        var output = this.list[0];
        this.list.shift();
        return output;
    };
    Queue.prototype.Add = function (item) {
        this.list.push(item);
    };
    Queue.prototype.AddRange = function (items) {
        for (var i = 0; i < items.length; i++) {
            this.list.push(items[i]);
        }
    };
    Queue.prototype.Peek = function () {
        return this.list[0];
    };
    Queue.prototype.PeekEnd = function () {
        return this.list[this.list.length - 1];
    };
    return Queue;
}());
exports.default = Queue;
//# sourceMappingURL=Queue.js.map