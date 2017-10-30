// given a serius of server updates, returns interpolated game state;
import Entity from "../core/entity";
import GameData from "../server/model/gameData";
import Vector from "../core/vector";
import * as gameProperties from '../core/gameProperties';
import Ball from "../core/ball";

export default class EntityInterpolation {
    constructor(){
        this.timeSinceLastServerUpdate = 0;
    }
    public timeSinceLastServerUpdate : number;
    public playerId: string;

    public resetTimeSinceLastServerUpdate(): void {
        this.timeSinceLastServerUpdate = 0;
    };

    public interpolate(serverUpdates: GameData[]): Entity[] {
        let output = [];
        if(serverUpdates.length > 1){
            const newGameState = serverUpdates[serverUpdates.length - 1];
            const oldGameState = serverUpdates[serverUpdates.length - 2];
            this.timeSinceLastServerUpdate = performance.now() - newGameState.ts;
            const lerpRatio = this.timeSinceLastServerUpdate / gameProperties.serverTimestep;

            for( let i =0 ; i < oldGameState.et.length; i++) {
                const oldEntity = oldGameState.et[i];
                if (oldEntity.id === "ball"){
                    const newEntity = <Ball>newGameState.et.find(x =>x.id === oldEntity.id);
                    const dx = newEntity.position.x - oldEntity.position.x;
                    const dy = newEntity.position.y - oldEntity.position.y;
                    const newPosition = new Vector(oldEntity.position.x + dx * lerpRatio, oldEntity.position.y + dy * lerpRatio);
                    const updatedEntity = new Ball(newEntity.id, newEntity.name, newPosition, newEntity.direction);
                    output.push(updatedEntity);
                } else if (oldEntity.id !== this.playerId){
                    // render other player
                } else {
                    output.push(oldEntity);
                }
            }
            return output;
        }
        return [];
    }
}
