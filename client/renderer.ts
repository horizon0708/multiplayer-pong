import * as properties from '../core/gameProperties';
import entity from '../core/entity';
import vector from '../core/vector';

const canvas  = <HTMLCanvasElement>document.getElementById("game");
const ctx = canvas.getContext("2d");

export default class renderer {
    public render(entities: entity[]): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        entities.forEach(entity => {
            this.drawEntity(entity.name, entity.position);
        });
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
}