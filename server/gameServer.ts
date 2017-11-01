import GameSimulation from "./gameSimulation";
import * as socketIo from "socket.io";
import GameData from "./model/gameData";
import Entity from "../core/entity";
import * as gameProperties from '../core/gameProperties';
import * as gameInputHandler from './gameInputHandler';
import Queue from "./model/Queue";
import InputQueue from "./model/InputQueue";
import PaddleData from "../core/model/PaddleData";

export default class GameServer {
   constructor(server){
       this.server = server;
       this.io =  socketIo(server);
       this.simulation = new GameSimulation();
       this.listen();
       this.send();
       //this.debug();
   }
   private server : any;
   private simulation: GameSimulation ;
   private io : any;
   private players = [];
   private updateLoop : any;
   public inputQueues: InputQueue[];


    private listen(): void {
        this.io.on('connection', (socket: any) => {
            console.log("socket connected: " + socket.id);
            socket.emit("id", socket.id);
            this.simulation.assignPlayer(socket.id);
            this.players.push(socket);
            this.inputQueues.push(new InputQueue(socket.id));

            socket.on('disconnect', ()=> {
                console.log('Got disconnect!');
                let i = this.players.indexOf(socket);
                this.players.splice(i, 1);
                console.log(this.players.length);
                this.simulation.stop();
            });

            socket.on('gameStart',(socket:any) => {
                console.log('game start');
                this.simulation.start();
            });

            socket.on('move', (data: PaddleData) => {
                // find the player's inputQueue
                const playerQueue = this.inputQueues.find(x => x.playerId === data.id);
                if(playerQueue){
                    const processedMovement = gameInputHandler.validate(data, playerQueue);
                    // if the movement is valid, add to InputQueue and tell the client that it was accepted
                    if(processedMovement.ack){
                        playerQueue.Add(processedMovement);
                        socket.emit('moveOk', processedMovement.ts);
                    }
                }
            });
        });
    }

    private send(): void {
        this.updateLoop = setInterval(()=>this.sendGameData(), gameProperties.serverTimestep);
    }

    private sendGameData(): void {
        this.io.emit('up', new GameData(this.simulation.gameState));
    }

    private debug(): void {
        setInterval(()=>console.log(this.simulation.gameState), 2000);
    }
}
