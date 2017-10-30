import Entity from './entity';
import Vector from './vector';

export default class Ball implements Entity{
    constructor(id:string, name:string, position: Vector, direction:Vector){
        this.id = id;
        this.name = name;
        this.position = position;
        this.direction = direction;
        this.speed = 10;
    }
    id: string;
    name: string;
    position: Vector;
    direction: Vector;
    speed: number;
}