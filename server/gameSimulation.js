"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = require("../core/ball");
var vector_1 = require("../core/vector");
var Physics = require("../core/physics");
var GameProperties = require("../core/gameProperties");
var gameEntities = [new ball_1.default('ball', 'ball', new vector_1.default(100, 100), new vector_1.default(1, 1))];
var GameSimulation = /** @class */ (function () {
    function GameSimulation() {
        this.gameState = gameEntities;
        this.deltaTime = 0;
        this.lastFrameTimeMs = 0;
    }
    GameSimulation.prototype.start = function () {
        var _this = this;
        this.physicsLoop = setInterval(function () { return _this.update(_this.gameState); }, GameProperties.serverTimestep); // 60 tick
    };
    GameSimulation.prototype.update = function (state) {
        Physics.update(state);
        // this.deltaTime += timestamp - this.lastFrameTimeMs; // get the delta time since last frame
        // this.lastFrameTimeMs = timestamp;
        // while (this.deltaTime >= GameProperties.physicsTimestep) {
        //      this.deltaTime -= GameProperties.physicsTimestep;
        // }
    };
    GameSimulation.prototype.stop = function () {
        clearInterval(this.physicsLoop);
        this.gameState = gameEntities;
    };
    return GameSimulation;
}());
exports.default = GameSimulation;
//# sourceMappingURL=gameSimulation.js.map