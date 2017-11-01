import Queue from "./Queue";

export default class InputQueue extends Queue{
    readonly playerId: string;

    constructor(playerId: string){
        super();
        this.playerId = playerId;
    }
}