import Vector from "../core/model/vector";
import * as Physics from '../core/physics';
import * as GameProperties from '../core/constants/gameProperties';
import GameServer from "./gameServer";
import GameEntity from "../core/gameEntity";

const gameEntities = [
    new GameEntity('ball', 'ball', 5, 5 ,new Vector(100,100), 6),
    new GameEntity('one', 'paddle',10, 40, new Vector(60, 150), 6)
];

export default class GameSimulation {
    constructor(server){
        this.gameState = gameEntities;
        this.deltaTime = 0;
        this.lastFrameTimeMs =0;
        this.server = server;
    }

    private deltaTime: number;
    private lastFrameTimeMs: number;
    private physicsLoop: any;
    public gameState: GameEntity[];
    public server: GameServer;

    public start(){
        this.physicsLoop = setInterval(()=>this.serverUpdate(this.gameState), GameProperties.physicsTimestep); // 10 tick
    }

    private serverUpdate(state: GameEntity[],){
        if(this.server.inputQueue.length > 0){
            Physics.PaddleMovement(this.server.inputQueue[0], this.gameState);
            this.server.inputQueue.shift();
        }
        Physics.update(state);
    }

    public assignPlayer(playerId){
        const index = gameEntities.findIndex(x => x.id === 'unassigned');
        if(index > 0){
            gameEntities[index].id = playerId;
        }
    }

    public stop(){
        clearInterval(this.physicsLoop);
        this.gameState = gameEntities;
    }


}

