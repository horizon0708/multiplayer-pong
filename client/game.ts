import render from './renderer';
import Ball from '../core/ball';
import Vector from '../core/vector';
import * as physics from "../core/physics";
import * as io from 'socket.io-client';
import GameData from "../server/model/gameData";
import Entity from "../core/entity";
import * as gameProperties from '../core/gameProperties';
import EntityInterpolation from "./entityInterpolation";

const renderer = new render();
let gameState = <Entity[]>[new Ball('ball', 'ball', new Vector(100,100), new Vector(1,1))];
let gameStarted = false;
const enableInterpolation = true;
const enableServer = true;

const socket = io();
const Interpolator = new EntityInterpolation();

let lastServerUpdateTimestamp = 0;
let previousServerUpdateTimestamp = 0;
let lastDrawTimestamp = 0;
let clientTimeElapsed = 0;

let gameUpdateQueue = [];
let serverUpdates = [];
let interpolated = [];

// Interpolation setting
const serverTick = 20;
const clientTick = 60;
//const difference = Math.floor(clientTick  /serverTick);
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
        if (!enableServer){
            physics.update(gameState);
            renderer.render(gameState);
        }
        else if(enableInterpolation){
            updateGameQueue(Interpolator.interpolate(serverUpdates));
            renderer.render(gameUpdateQueue[gameUpdateQueue.length-1]);
        } else {
            renderer.render(serverUpdates[0].et)
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
    const timestamped = {...data, ts: performance.now()}
    serverUpdates.push(timestamped);
    if(serverUpdates.length >= 3){
        serverUpdates.shift();
    }
}

function updateGameQueue(entities: Entity[]){
    gameUpdateQueue.push(entities);
    if(gameUpdateQueue.length > 10){
        gameUpdateQueue.shift();
    }
}

