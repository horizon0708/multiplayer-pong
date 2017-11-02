import * as properties from '../core/gameProperties';
import entity, {default as Entity} from '../core/entity';
import vector from '../core/vector';
import GameData from "../server/model/gameData";
import EntityInterpolation from "./entityInterpolation";

export default class Renderer {
    constructor(playerId: string, serverUpdates: GameData[], clientInputs: any, enableInterp: boolean, enableClientPrediction: boolean){
        this.playerId = playerId;
        this.serverUpdates = serverUpdates;
        this.enableInterp = enableInterp;
        this.enableClientPrediction = enableClientPrediction;
        this.fpsDisplay = document.getElementById('fpsDisplay');
        this.clientInputs = clientInputs;
        this.Interpolater = new EntityInterpolation();
        this.canvas = <HTMLCanvasElement>document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
    }

    public playerId : string ;
    public serverUpdates: GameData[];
    public interpolatedFrames: any[];
    public clientPredictionFrames: any[];
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
        requestAnimationFrame(()=>this.renderLoop(performance.now()));
    }

    private renderLoop(timestamp){
        if(this.enableInterp && this.enableClientPrediction){
            this.interpolate();
            this.renderWithClientPrediction(this.clientPredictionFrames[this.clientPredictionFrames.length -1],
                this.interpolatedFrames[this.interpolatedFrames.length -1]);
        }
        else if(this.enableInterp && !this.enableClientPrediction){
            this.interpolate();
            this.render(this.interpolatedFrames[this.interpolatedFrames.length -1]);
        }
        else if(!this.enableInterp && this.enableClientPrediction){
            this.renderWithClientPrediction(this.clientPredictionFrames[this.clientPredictionFrames.length -1],
                this.serverUpdates[this.serverUpdates.length -1]);
        }
        else {
            this.render(this.serverUpdates[this.serverUpdates.length -1].et);
        }

        this.drawFPS(timestamp);
        requestAnimationFrame( ()=> this.renderLoop );
    }

    private drawEntity(name:string, position:vector): void {
        if(name === "paddle"){
            this.ctx.beginPath();
            this.ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            this.ctx.fill();
            this.ctx.closePath();
        }
        if(name === "ball"){
            this.ctx.beginPath();
            this.ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    private render(entities: entity[]): void {
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

    private renderPlayer(playerState: entity): void{
        this.drawEntity(playerState.name, playerState.position);
    }

    private renderExceptPlayer(entities: entity[]): void {
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
}