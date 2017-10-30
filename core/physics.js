"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameProperties = require("./gameProperties");
function update(entities) {
    ballBounceOffLeftAndRight(true, entities);
    ballBounceOffTopAndBottom(true, entities);
    ballMovement(entities);
}
exports.update = update;
function ballMovement(entities) {
    var ball = entities.find(function (x) { return x.id === "ball"; });
    if (!ball) {
        return;
    }
    ball.position.x += ball.direction.x * ball.speed;
    ball.position.y += ball.direction.y * ball.speed;
}
function ballBounceOffTopAndBottom(enabled, entities) {
    if (enabled) {
        var ball = entities.find(function (x) { return x.id === "ball"; });
        if (ball.position.y + ball.direction.y * ball.speed > gameProperties.gameHeight - gameProperties.ballRadius
            || ball.position.y + ball.direction.y * ball.speed < gameProperties.ballRadius) {
            ball.direction.y = -ball.direction.y;
        }
    }
}
function ballBounceOffLeftAndRight(enabled, entities) {
    if (enabled) {
        var ball = entities.find(function (x) { return x.id === "ball"; });
        if (ball.position.x + ball.direction.x * ball.speed > gameProperties.gameWidth - gameProperties.ballRadius
            || ball.position.x + ball.direction.x * ball.speed < gameProperties.ballRadius) {
            ball.direction.x = -ball.direction.x;
        }
    }
}
//# sourceMappingURL=physics.js.map