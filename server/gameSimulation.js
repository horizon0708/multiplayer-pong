"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = require("../core/ball");
var vector_1 = require("../core/vector");
var Physics = require("../core/physics");
var GameProperties = require("../core/gameProperties");
var paddle_1 = require("../core/paddle");
var gameEntities = [
    new ball_1.default('ball', 'ball', new vector_1.default(100, 100), new vector_1.default(1, 1)),
    new paddle_1.default('one', 'paddle', new vector_1.default(60, 150))
];
var GameSimulation = /** @class */ (function () {
    function GameSimulation(server) {
        this.gameState = gameEntities;
        this.deltaTime = 0;
        this.lastFrameTimeMs = 0;
        this.server = server;
    }
    GameSimulation.prototype.start = function () {
        var _this = this;
        this.physicsLoop = setInterval(function () { return _this.serverUpdate(_this.gameState); }, GameProperties.physicsTimestep); // 10 tick
    };
    GameSimulation.prototype.serverUpdate = function (state) {
        // go through and apply all inputs
        // handle phyics ( ball movements, collision )
        if (this.server.inputQueue.length > 0) {
            console.log(this.server.inputQueue);
            Physics.PaddleMovement(this.server.inputQueue[0], this.gameState);
            this.server.inputQueue.shift();
        }
        Physics.update(state);
        // this.deltaTime += timestamp - this.lastFrameTimeMs; // get the delta time since last frame
        // this.lastFrameTimeMs = timestamp;
        // while (this.deltaTime >= GameProperties.physicsTimestep) {
        //      this.deltaTime -= GameProperties.physicsTimestep;
        // }
    };
    GameSimulation.prototype.assignPlayer = function (playerId) {
        var index = gameEntities.findIndex(function (x) { return x.id === 'unassigned'; });
        if (index > 0) {
            gameEntities[index].id = playerId;
        }
    };
    GameSimulation.prototype.stop = function () {
        clearInterval(this.physicsLoop);
        this.gameState = gameEntities;
    };
    return GameSimulation;
}());
exports.default = GameSimulation;
//# sourceMappingURL=gameSimulation.js.map