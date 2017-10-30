import Ball from "../core/ball";
import Vector from "../core/vector";
import * as Physics from '../core/physics';
import Entity from "../core/entity";
import * as GameProperties from '../core/gameProperties';
import {physicsTimestep} from "../core/gameProperties";

const gameEntities = [new Ball('ball', 'ball', new Vector(100,100), new Vector(1,1))];

export default class GameSimulation {
    constructor(){
        this.gameState = gameEntities;
        this.deltaTime = 0;
        this.lastFrameTimeMs =0;
    }

    private deltaTime: number;
    private lastFrameTimeMs: number;
    private physicsLoop: any;
    public gameState: Entity[];

    public start(){
        this.physicsLoop = setInterval(()=>this.update(this.gameState), GameProperties.serverTimestep); // 60 tick
    }

    private update(state: Entity[]){
        Physics.update(state);

        // this.deltaTime += timestamp - this.lastFrameTimeMs; // get the delta time since last frame
        // this.lastFrameTimeMs = timestamp;
        // while (this.deltaTime >= GameProperties.physicsTimestep) {
        //      this.deltaTime -= GameProperties.physicsTimestep;
        // }
    }

    public stop(){
        clearInterval(this.physicsLoop);
        this.gameState = gameEntities;
    }
}

