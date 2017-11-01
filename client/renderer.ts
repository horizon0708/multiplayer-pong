import * as properties from '../core/gameProperties';
import entity from '../core/entity';
import vector from '../core/vector';

const canvas  = <HTMLCanvasElement>document.getElementById("game");
const ctx = canvas.getContext("2d");

export default class renderer {
    constructor(playerId: string){
        this.playerId = playerId;
    }

    public playerId : string ;

    public render(entities: entity[]): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        entities.forEach(entity => {
            this.drawEntity(entity.name, entity.position);
        });
    }

    private renderLoop(timestamp){

    }

    private drawEntity(name:string, position:vector): void {
        if(name === "paddle"){
            ctx.beginPath();
            ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            ctx.fill();
            ctx.closePath();
        }
        if(name === "ball"){
            ctx.beginPath();
            ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            ctx.fill();
            ctx.closePath();
        }
    }

    public renderWithClientPrediction(playerState, worldState){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
}