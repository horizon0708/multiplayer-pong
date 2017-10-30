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
var socket = io();
var serverUpdates = [];
var interpolated = [];
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
    function main() {
        window.requestAnimationFrame(main);
        if (enableInterpolation) {
            if (interpolated.length > 100) {
                renderer.render(interpolated[90]);
            }
        }
        else {
            physics.update(gameState);
            renderer.render(gameState);
        }
        // Your main loop contents.
    }
    main(); // Start the cycle
})();
function onSocketConnect() {
    console.log("connected to server");
}
function onServerUpdate(data) {
    var serverTick = 20;
    var clientTick = 60;
    var difference = 1;
    //const difference = 10;
    var queueLimit = 3;
    serverUpdates.push(data);
    if (serverUpdates.length > 1) {

        for (var i = 0; i < difference; i++) {
            var oldBall = oldGameState.et[0];
            var newBall = newGameState.et[0];
            var InterpX = oldBall.position.x + (newBall.position.x - oldBall.position.x) / difference * i;
            var InterpY = oldBall.position.y + (newBall.position.y - oldBall.position.y) / difference * i;
            var interpPos = new vector_1.default(InterpX, InterpY);
            var interpBall = new ball_1.default(newBall.id, newBall.name, interpPos, newBall.direction);
            var interpGameState = [interpBall];
            interpolated.push(interpGameState);
            if (interpolated.length > queueLimit * clientTick) {
                interpolated.shift();
            }
        }
    }
    if (serverUpdates.length > queueLimit) {
        serverUpdates.shift();
    }
}

function interpolate(serverUpdates){
    // 3 ticks of server updates, use update at [2] and interpolate to [1]
    if(serverUpdates.length > 2){
        var nextGameState = serverUpdates[serverUpdates.length - 1];
        var oldGameState = serverUpdates[serverUpdates.length - 2];
    }
}
