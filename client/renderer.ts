import * as properties from '../core/constants/gameProperties';
import vector from '../core/model/vector';
import GameData from "../server/model/gameData";
import EntityInterpolation from "./entityInterpolation";
import Client from "./client";
import ClientPrediction from "./clientPrediction";
import GameEntity from "../core/gameEntity";

export default class Renderer {
    constructor(playerId: string, gameClient, serverUpdates: GameData[], clientInputs: any, enableInterp: boolean, enableClientPrediction: boolean, public color: string = ''){
        this.playerId = playerId;
        this.gameClient = gameClient;
        this.serverUpdates = serverUpdates;
        this.enableInterp = enableInterp;
        this.enableClientPrediction = enableClientPrediction;
        this.fpsDisplay = document.getElementById('fpsDisplay');
        this.clientInputs = clientInputs;
        this.Interpolater = new EntityInterpolation();
        this.clientPrediction = new ClientPrediction(this.gameClient);
        this.canvas =  <HTMLCanvasElement>document.getElementById(playerId);
        this.ctx = this.canvas.getContext("2d");
        if(color === ''){
            this.color = this.getColor(playerId);
        }
    }
    public clientPrediction: ClientPrediction;
    public gameClient: Client;
    public playerId : string ;
    public serverUpdates: GameData[];
    public interpolatedFrames: any[] = [];
    public clientPredictionFrames: any[] =[];
    public clientInputs: any[];
    public enableInterp: boolean = true;
    public enableClientPrediction: boolean= false;
    private canvas;
    private ctx;
    private fpsDisplay: any;
    private fps = 60;
    private framesThisSecond = 0;
    private lastFpsUpdate = 0;
    private Interpolater: EntityInterpolation;

    startRender(){
        window.requestAnimationFrame(()=>this.renderLoop(performance.now()));
    }

    private getColor(playerId) :string {
        return playerId === 'one' ? 'rgba(0, 25, 255,0.5)' : 'rgba(255,0,0,0.5)';
    }

    private renderLoop(timestamp){
        if(this.enableInterp && this.enableClientPrediction){
            this.interpolate();
            this.addClientPredictionFrame();
            if(this.clientPredictionFrames.length>0 && this.interpolatedFrames.length >0){
                this.renderWithClientPrediction(this.clientPredictionFrames[this.clientPredictionFrames.length -1],
                    this.interpolatedFrames[this.interpolatedFrames.length -1]);
            }
        }
        else if(this.enableInterp && !this.enableClientPrediction){
            this.interpolateAll();
            if(this.interpolatedFrames.length > 0){
                this.render(this.interpolatedFrames[this.interpolatedFrames.length -1]);
            }
        }
        else if(!this.enableInterp && this.enableClientPrediction){
            this.addClientPredictionFrame();
            if(this.clientPredictionFrames.length > 0){
                this.renderWithClientPrediction(this.clientPredictionFrames[this.clientPredictionFrames.length -1],
                    this.serverUpdates[this.serverUpdates.length -1]);
            }
        }
        else {
            if(this.serverUpdates.length >0){
                this.render(this.serverUpdates[this.serverUpdates.length -1].et);
            }
        }

        this.drawFPS(timestamp);
        window.requestAnimationFrame( ()=> this.renderLoop(performance.now()) );
    }

    private drawEntity(name:string, position:vector): void {
        if(name === "paddle"){
            //this.ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(position.x, position.y, 10, 40);
        }
        if(name === "ball"){
            this.ctx.beginPath();
            this.ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    private render(entities: GameEntity[]): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        entities.forEach(entity => {
            this.drawEntity(entity.name, entity.position);
        });
    }

    private drawFPS(timestamp){
        if (timestamp > this.lastFpsUpdate + 1000) { // update every second
            this.fps = 0.25 * this.framesThisSecond + (1 - 0.25) * this.fps; // compute the new FPS
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
        }
        this.framesThisSecond++;
        this.fpsDisplay.innerHTML = Math.round(this.fps) + ' FPS';
    }

    private renderWithClientPrediction(playerState, worldState){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderPlayer(playerState);
        this.renderExceptPlayer(worldState);
    }

    private renderPlayer(playerState: GameEntity): void{
        if(playerState){
            this.drawEntity(playerState.name, playerState.position);
        }
    }

    private renderExceptPlayer(entities: GameEntity[]): void {
        const world = entities.filter(x => x.id !== this.playerId);
        world.forEach(x => this.drawEntity(x.name, x.position));
    }

    private interpolate(){
        const newFrame = this.Interpolater.interpolate(this.serverUpdates);
        this.interpolatedFrames.push(newFrame);
        if(this.interpolatedFrames.length > 10){
            this.interpolatedFrames.shift();
        }
    }

    private interpolateAll(){
        const newFrame = this.Interpolater.interpolateAll(this.serverUpdates);
        this.interpolatedFrames.push(newFrame);
        if(this.interpolatedFrames.length > 10){
            this.interpolatedFrames.shift();
        }
    }

    private addClientPredictionFrame(){
        // this.clientPrediction.movementPrediction();
        if(this.clientPredictionFrames.length < 1){
            if (this.gameClient.serverUpdates.length >1){
                this.clientPredictionFrames.push(this.gameClient.serverUpdates[this.gameClient.serverUpdates.length-1].et.find(x=>x.id === 'one'));
            }
        }

        if(this.clientPredictionFrames.length > 30){
            this.clientPredictionFrames.shift();
        }
    }
}