"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var ball_1 = require("../core/ball");
var vector_1 = require("../core/vector");
var physics = require("../core/physics");
var io = require("socket.io-client");
var entityInterpolation_1 = require("./entityInterpolation");
var renderer = new renderer_1.default();
var interpolation = new entityInterpolation_1.default();
var playerId;
var gameState = [
    new ball_1.default('ball', 'ball', new vector_1.default(100, 100), new vector_1.default(1, 1))
];
var gameStarted = false;
var enableInterpolation = true;
var enableServer = true;
var socket = io();
var gameUpdateQueue = [];
var serverUpdates = [];
var fpsDisplay = document.getElementById('fpsDisplay');
var fps = 60, framesThisSecond = 0, lastFpsUpdate = 0;
//tick
var delta = 0;
var queueLimit = 3;
socket.on("connect", function (data) { return onSocketConnect(); });
socket.on("up", function (data) {
    onServerUpdate(data);
});
socket.on("id", function (data) {
    console.log(data);
    playerId = data;
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
        //Input
        if (upPressed) {
            console.log("going up");
        }
        else if (downPressed) {
            console.log("going down");
        }
        if (!enableServer) {
            physics.update(gameState);
            renderer.render(gameState);
        }
        else if (enableInterpolation) {
            updateGameQueue(interpolation.interpolate(serverUpdates));
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
    var timestamped = __assign({}, data, { ts: performance.now() });
    serverUpdates.push(timestamped);
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
//# sourceMappingURL=game.js.map