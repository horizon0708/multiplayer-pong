import Client from "./client";
import * as Physics from '../core/physics';

export default class ClientPrediction{
    constructor(client){
        this.client = client;
    }

    public playerId: string = "one";
    public client: Client;

    public generateMovementPredictionFrame(inputData: number) : void{
        // first check if there are any predicted frames
        const frames = this.client.renderer.clientPredictionFrames;
        if(frames.length < 1){
            if(this.client.serverUpdates.length >1){
                frames.push(this.client.serverUpdates[this.client.serverUpdates.length-1].et.find(x=>x.id === 'one'));
            }
        } else {
            const newFrame = Physics.SinglePaddleMovement(inputData, frames[frames.length-1]);
            frames.push(newFrame);
        }
    }

    public correctMovementPredictionFrame(data): void {
        const frames = this.client.renderer.clientPredictionFrames;
        const player = data.et.find(x=>x.id === "one");
        frames.push(player);
    }
}