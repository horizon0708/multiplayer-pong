import PaddleData from "../core/model/PaddleData";
import Queue from "./model/Queue";

export function validate(paddleData: PaddleData, gameQueue: Queue<PaddleData>) : PaddleData{
    // Disregard packets that are too late
    if(paddleData.ts < gameQueue.PeekEnd().ts){
        return paddleData;
    }
    // Invalidate packets that is already validated by client
    if(paddleData.ack){
        paddleData.ack = false;
        return paddleData;
    }

    // TODO: more validation
    paddleData.ack = true;
    return paddleData;
}