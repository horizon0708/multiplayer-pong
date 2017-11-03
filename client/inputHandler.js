"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameProperties = require("../core/gameProperties");
var InputHandler = /** @class */ (function () {
    function InputHandler(client) {
        var _this = this;
        this.upPressed = false;
        this.downPressed = false;
        document.addEventListener("keydown", function (e) { return _this.keyDownHandler(e); }, false);
        document.addEventListener("keyup", function (e) { return _this.keyUpHandler(e); }, false);
        this.client = client;
        this.inputLoop();
    }
    InputHandler.prototype.inputLoop = function () {
        var _this = this;
        setInterval(function () { return _this.getInput(); }, gameProperties.physicsTimestep);
    };
    InputHandler.prototype.getInput = function () {
        if (this.upPressed === true) {
            this.client.clientInputs.push(1);
        }
        else if (this.downPressed === true) {
            this.client.clientInputs.push(-1);
        }
    };
    InputHandler.prototype.keyDownHandler = function (e) {
        if (e.keyCode == 38) {
            this.upPressed = true;
        }
        else if (e.keyCode == 40) {
            this.downPressed = true;
        }
    };
    InputHandler.prototype.keyUpHandler = function (e) {
        if (e.keyCode == 38) {
            this.upPressed = false;
        }
        else if (e.keyCode == 40) {
            this.downPressed = false;
        }
    };
    return InputHandler;
}());
exports.default = InputHandler;
//# sourceMappingURL=inputHandler.js.map