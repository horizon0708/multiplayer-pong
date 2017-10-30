import GameSimulation from "./gameSimulation";
import * as socketIo from "socket.io";
import GameData from "./model/gameData";
import Entity from "../core/entity";

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

    private listen(): void {
        this.io.on('connection', (socket: any) => {
            console.log("socket connected: " + socket.id);
            this.players.push(socket);

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
        });
    }

    private send(): void {
        this.updateLoop = setInterval(()=>this.sendGameData(), 1000/20);
    }

    private sendGameData(): void {
        this.io.emit('up', new GameData(this.simulation.gameState));
    }

    private debug(): void {
        setInterval(()=>console.log(this.simulation.gameState), 2000);

    }
}
