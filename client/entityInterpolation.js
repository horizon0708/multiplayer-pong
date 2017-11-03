"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../core/vector");
var gameProperties = require("../core/gameProperties");
var ball_1 = require("../core/ball");
var paddle_1 = require("../core/paddle");
var EntityInterpolation = /** @class */ (function () {
    function EntityInterpolation() {
        this.timeSinceLastServerUpdate = 0;
    }
    EntityInterpolation.prototype.resetTimeSinceLastServerUpdate = function () {
        this.timeSinceLastServerUpdate = 0;
    };
    ;
    EntityInterpolation.prototype.interpolate = function (serverUpdates) {
        var output = [];
        if (serverUpdates.length > 1) {
            var newGameState = serverUpdates[serverUpdates.length - 1];
            var oldGameState = serverUpdates[serverUpdates.length - 2];
            this.timeSinceLastServerUpdate = performance.now() - newGameState.ts;
            var lerpRatio = this.timeSinceLastServerUpdate / gameProperties.serverTimestep;
            var _loop_1 = function (i) {
                var oldEntity = oldGameState.et[i];
                if (oldEntity.id !== this_1.playerId) {
                    // render other player
                    var newEntity = newGameState.et.find(function (x) { return x.id === oldEntity.id; });
                    var dx = newEntity.position.x - oldEntity.position.x;
                    var dy = newEntity.position.y - oldEntity.position.y;
                    var newPosition = new vector_1.default(oldEntity.position.x + dx * lerpRatio, oldEntity.position.y + dy * lerpRatio);
                    var updatedEntity = oldEntity.id === "ball"
                        ? new ball_1.default(newEntity.id, newEntity.name, newPosition, new vector_1.default(0, 0))
                        : new paddle_1.default(newEntity.id, newEntity.name, newPosition);
                    output.push(updatedEntity);
                }
                else {
                    output.push(oldEntity);
                }
            };
            var this_1 = this;
            for (var i = 0; i < oldGameState.et.length; i++) {
                _loop_1(i);
            }
            return output;
        }
        return [];
    };
    EntityInterpolation.prototype.interpolateAll = function (serverUpdates) {
        var output = [];
        if (serverUpdates.length > 1) {
            var newGameState = serverUpdates[serverUpdates.length - 1];
            var oldGameState = serverUpdates[serverUpdates.length - 2];
            this.timeSinceLastServerUpdate = performance.now() - newGameState.ts;
            var lerpRatio = this.timeSinceLastServerUpdate / gameProperties.serverTimestep;
            var _loop_2 = function (i) {
                var oldEntity = oldGameState.et[i];
                var newEntity = newGameState.et.find(function (x) { return x.id === oldEntity.id; });
                var dx = newEntity.position.x - oldEntity.position.x;
                var dy = newEntity.position.y - oldEntity.position.y;
                var newPosition = new vector_1.default(oldEntity.position.x + dx * lerpRatio, oldEntity.position.y + dy * lerpRatio);
                var updatedEntity = oldEntity.id === "ball"
                    ? new ball_1.default(newEntity.id, newEntity.name, newPosition, new vector_1.default(0, 0))
                    : new paddle_1.default(newEntity.id, newEntity.name, newPosition);
                output.push(updatedEntity);
            };
            for (var i = 0; i < oldGameState.et.length; i++) {
                _loop_2(i);
            }
            return output;
        }
        return [];
    };
    return EntityInterpolation;
}());
exports.default = EntityInterpolation;
//# sourceMappingURL=entityInterpolation.js.map