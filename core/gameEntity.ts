import Vector from "./model/vector";

export default class GameEntity {
    constructor(id, name, height, width, position: Vector, speed: number){
        this.id = id;
        this.name = name;
        this.height = height;
        this.width = width;
        this.position = position;
        this.speed = speed;
    }
    public id;
    public name;
    public height;
    public width;
    public color;
    public position: Vector;
    public speed: number;
    public direction: Vector = new Vector(1,1);

    public getTop(): number{
        return this.position.y - this.height / 2;
    }
    public getBottom(): number{
        return this.position.y + this.height / 2;
    }
    public getLeft(): number{
        return this.position.x - this.width / 2;
    }
    public getRight(): number{
        return this.position.x + this.width / 2;
    }
}
