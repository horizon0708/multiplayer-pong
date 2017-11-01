import Entity from './entity';
import Vector from './vector';

export default class Paddle implements Entity{
    constructor(id:string, name:string, position: Vector){
        this.id = id;
        this.name = name;
        this.position = position;
        this.speed = 10;
    }
    id: string;
    name: string;
    position: Vector;
    speed: number;
}