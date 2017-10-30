"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var ball_1 = require("../core/ball");
var vector_1 = require("../core/vector");
var physics = require("../core/physics");
var io = require("socket.io-client");
var renderer = new renderer_1.default();
var gameState = [new ball_1.default('ball', 'ball', new vector_1.default(100, 100), new vector_1.default(1, 1))];
var gameStarted = false;
var enableInterpolation = true;
var enableServer = true;
var socket = io();
var lastServerUpdateTimestamp = 0;
var previousServerUpdateTimestamp = 0;
var gameUpdateQueue = [];
var serverUpdates = [];
var interpolated = [];
// Interpolation setting
var serverTick = 20;
var clientTick = 60;
//const difference = Math.floor(clientTick  /serverTick);
//const difference = 10;
var fpsDisplay = document.getElementById('fpsDisplay');
var fps = 60, framesThisSecond = 0, lastFpsUpdate = 0;
//tick
var delta = 0;
var queueLimit = 3;
socket.on("connect", function (data) { return onSocketConnect(); });
socket.on("up", function (data) {
    onServerUpdate(data);
});
var upPressed = false;
var downPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 38) {
        upPressed = true;
        if (!gameStarted) {
            gameStarted = true;
            console.log('game start button pressed');
            socket.emit('gameStart');
        }
    }
    else if (e.keyCode == 40) {
        downPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 38) {
        upPressed = false;
    }
    else if (e.keyCode == 40) {
        downPressed = false;
    }
}
;
(function () {
    function main(timestamp) {
        window.requestAnimationFrame(main);
        if (!enableServer) {
            physics.update(gameState);
            renderer.render(gameState);
        }
        else if (enableInterpolation) {
            updateGameQueue(interpolate());
            renderer.render(gameUpdateQueue[gameUpdateQueue.length - 1]);
        }
        else {
            renderer.render(serverUpdates[0].et);
        }
        if (timestamp > lastFpsUpdate + 1000) {
            fps = 0.25 * framesThisSecond + (1 - 0.25) * fps; // compute the new FPS
            lastFpsUpdate = timestamp;
            framesThisSecond = 0;
        }
        framesThisSecond++;
        fpsDisplay.innerHTML = Math.round(fps) + ' FPS';
        // Your main loop contents.
    }
    main(window.performance.now()); // Start the cycle
})();
function onSocketConnect() {
    console.log("connected to server");
}
function onServerUpdate(data) {
    serverUpdates.push(data);
    previousServerUpdateTimestamp = lastServerUpdateTimestamp;
    lastServerUpdateTimestamp = performance.now();
    if (serverUpdates.length >= 3) {
        serverUpdates.shift();
    }
}
function updateGameQueue(entities) {
    gameUpdateQueue.push(entities);
    if (gameUpdateQueue.length > 10) {
        gameUpdateQueue.shift();
    }
}
function interpolate() {
    if (serverUpdates.length > 1) {
        var newGameState = serverUpdates[serverUpdates.length - 1];
        var oldGameState = serverUpdates[serverUpdates.length - 2];
        var tsNew = lastServerUpdateTimestamp;
        var tsOld = previousServerUpdateTimestamp;
        var tsDifference = tsNew - tsOld;
        var clientTimeElapsed = performance.now() - previousServerUpdateTimestamp;
        var interpolateRatio = clientTimeElapsed / tsDifference;
        //const interpolateRatio = 0.1;
        console.log(tsDifference);
        var ballOld = oldGameState.et[0];
        var ballNew = newGameState.et[0];
        var dx = ballNew.position.x - ballOld.position.x;
        var dy = ballNew.position.y - ballOld.position.y;
        var newPosition = new vector_1.default(ballOld.position.x + dx * interpolateRatio, ballOld.position.y + interpolateRatio);
        var ball = new ball_1.default(ballNew.id, ballNew.name, newPosition, ballNew.direction);
        return [ball];
    }
    return serverUpdates[0].et;
}
//# sourceMappingURL=game.js.map