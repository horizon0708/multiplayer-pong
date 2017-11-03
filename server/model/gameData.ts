import GameEntity from "../../core/gameEntity";

export default class GameData {
    constructor(entities: GameEntity[]){
        this.ts = Date.now();
        this.et = entities;
    }
    public ts: number;
    public et: GameEntity[]
}