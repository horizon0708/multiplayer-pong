"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = require("../core/ball");
var vector_1 = require("../core/vector");
var Physics = require("../core/physics");
var gameEntities = [new ball_1.default('ball', 'ball', new vector_1.default(100, 100), new vector_1.default(1, 1))];
var GameSimulation = (function () {
    function GameSimulation() {
        this.gameState = gameEntities;
    }
    GameSimulation.prototype.start = function () {
        var _this = this;
        this.physicsLoop = setInterval(function () { return _this.update(_this.gameState); }, 16.67); // 60 tick
    };
    GameSimulation.prototype.update = function (state) {
        Physics.update(state);
    };
    GameSimulation.prototype.stop = function () {
        clearInterval(this.physicsLoop);
        this.gameState = gameEntities;
    };
    return GameSimulation;
}());
exports.default = GameSimulation;
//# sourceMappingURL=gameSimulation.js.map