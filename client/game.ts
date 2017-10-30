import render from './renderer';
import Ball from '../core/ball';
import Vector from '../core/vector';
import * as physics from "../core/physics";
import * as io from 'socket.io-client';
import GameData from "../server/model/gameData";
import Entity from "../core/entity";

const renderer = new render();
let gameState = <Entity[]>[new Ball('ball', 'ball', new Vector(100,100), new Vector(1,1))];
let gameStarted = false;
const enableInterpolation = false;

const socket = io();

let serverUpdates = [];
let interpolated = [];

// Interpolation setting
const serverTick = 20;
const clientTick = 60;
const difference = Math.floor(clientTick  /serverTick);
//const difference = 10;
var fpsDisplay = document.getElementById('fpsDisplay');
var fps = 60,
    framesThisSecond = 0,
    lastFpsUpdate = 0;

//tick
let delta = 0;

const queueLimit = 3;

socket.on("connect", data=>onSocketConnect());
socket.on("up", data=>{
    onServerUpdate(data);
});


var upPressed = false;
var downPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 38) {
        upPressed = true;
        if(!gameStarted){
            gameStarted = true;
            console.log('game start button pressed');
            socket.emit('gameStart');
        }
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}



;(function () {
    function main(timestamp) {
        window.requestAnimationFrame( main );
        if(enableInterpolation){
            if(interpolated.length > 100){
                renderer.render(interpolated[90]);
                if(interpolated.length > queueLimit * clientTick){
                    interpolated.shift();
                }
            }
        } else {
            physics.update(gameState);
            renderer.render(gameState);
        }

        if (timestamp > lastFpsUpdate + 1000) { // update every second
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

function onSocketConnect(): void {
    console.log("connected to server");

}

function onServerUpdate(data: GameData): void {
    serverUpdates.push(data);
    if(serverUpdates.length > 1){
        const newGameState = serverUpdates[serverUpdates.length - 1];
        const oldGameState = serverUpdates[serverUpdates.length - 2];
        for(let i=0; i < difference; i++){
            const oldBall = <Ball>oldGameState.et[0];
            const oldBallTime = <number>oldGameState.ts;
            const newBall = <Ball>newGameState.et[0];
            const newBallTime = <number>newGameState.ts;
            const InterpX = oldBall.position.x + (newBall.position.x - oldBall.position.x) / difference * i;
            const InterpY = oldBall.position.y + (newBall.position.y - oldBall.position.y) / difference * i;

            const interpPos = new Vector(InterpX, InterpY);
            const interpBall = new Ball(newBall.id, newBall.name, interpPos, newBall.direction);
            const interpGameState = [interpBall];
            if(enableInterpolation){
                interpolated.push(interpGameState);
            }
        }
    }
    if(serverUpdates.length > queueLimit){
        serverUpdates.shift();
    }

}
