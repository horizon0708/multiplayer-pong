import Entity from "../../core/entity";

export default class GameData {
    constructor(entities: Entity[]){
        this.ts = Date.now();
        this.et = entities;
    }
    public ts: number;
    public et: Entity[]
}