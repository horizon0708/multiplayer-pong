"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = require("./Queue");
var InputQueue = /** @class */ (function (_super) {
    __extends(InputQueue, _super);
    function InputQueue(playerId) {
        var _this = _super.call(this) || this;
        _this.playerId = playerId;
        return _this;
    }
    return InputQueue;
}(Queue_1.default));
exports.default = InputQueue;
//# sourceMappingURL=InputQueue.js.map