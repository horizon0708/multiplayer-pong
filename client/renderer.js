"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var properties = require("../core/gameProperties");
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var renderer = (function () {
    function renderer() {
    }
    renderer.prototype.render = function (entities) {
        var _this = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        entities.forEach(function (entity) {
            _this.drawEntity(entity.name, entity.position);
        });
    };
    renderer.prototype.drawEntity = function (name, position) {
        if (name === "paddle") {
            ctx.beginPath();
            ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            ctx.fill();
            ctx.closePath();
        }
        if (name === "ball") {
            ctx.beginPath();
            ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            ctx.fill();
            ctx.closePath();
        }
    };
    return renderer;
}());
exports.default = renderer;
//# sourceMappingURL=renderer.js.map