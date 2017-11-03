// given a serius of server updates, returns interpolated game state;
import GameData from "../server/model/gameData";
import Vector from "../core/model/vector";
import * as gameProperties from '../core/constants/gameProperties';
import GameEntity from "../core/gameEntity";

export default class EntityInterpolation {
    constructor(){
        this.timeSinceLastServerUpdate = 0;
    }
    public timeSinceLastServerUpdate : number;
    public playerId: string = "one";

    public resetTimeSinceLastServerUpdate(): void {
        this.timeSinceLastServerUpdate = 0;
    };

    public interpolate(serverUpdates: GameData[]): GameEntity[] {
        let output = [];
        if(serverUpdates.length > 1){
            const newGameState = serverUpdates[serverUpdates.length - 1];
            const oldGameState = serverUpdates[serverUpdates.length - 2];
            this.timeSinceLastServerUpdate = performance.now() - newGameState.ts;
            const lerpRatio = this.timeSinceLastServerUpdate / gameProperties.serverTimestep;

            for( let i =0 ; i < oldGameState.et.length; i++) {
                const oldEntity = oldGameState.et[i];
                if (oldEntity.id !== this.playerId){
                    // render other player
                        const newEntity = <GameEntity>newGameState.et.find(x =>x.id === oldEntity.id);
                        const dx = newEntity.position.x - oldEntity.position.x;
                        const dy = newEntity.position.y - oldEntity.position.y;
                        const newPosition = new Vector(oldEntity.position.x + dx * lerpRatio, oldEntity.position.y + dy * lerpRatio);
                        let updatedEntity = oldEntity.id === "ball"
                        ? new GameEntity(newEntity.id, newEntity.name, oldEntity.height, oldEntity.width, newPosition, oldEntity.speed)
                            : new GameEntity(newEntity.id, newEntity.name, oldEntity.height, oldEntity.width, newPosition, oldEntity.speed);

                        output.push(updatedEntity);

                } else {
                    output.push(oldEntity);
                }
            }
            return output;
        }
        return [];
    }

    public interpolateAll(serverUpdates: GameData[]): GameEntity [] {
        let output = [];
        if(serverUpdates.length > 1){
            const newGameState = serverUpdates[serverUpdates.length - 1];
            const oldGameState = serverUpdates[serverUpdates.length - 2];
            this.timeSinceLastServerUpdate = performance.now() - newGameState.ts;
            const test = (newGameState.ts - oldGameState.ts);
            console.log(test);
            const lerpRatio = this.timeSinceLastServerUpdate / gameProperties.serverTimestep;

            for( let i =0 ; i < oldGameState.et.length; i++) {
                const oldEntity = oldGameState.et[i];

                    const newEntity = <GameEntity>newGameState.et.find(x =>x.id === oldEntity.id);
                    const dx = newEntity.position.x - oldEntity.position.x;
                    const dy = newEntity.position.y - oldEntity.position.y;
                    const newPosition = new Vector(oldEntity.position.x + dx * lerpRatio, oldEntity.position.y + dy * lerpRatio);
                    let updatedEntity = oldEntity.id === "ball"
                        ? new GameEntity(newEntity.id, newEntity.name, oldEntity.height, oldEntity.width, newPosition, oldEntity.speed)
                        : new GameEntity(newEntity.id, newEntity.name, oldEntity.height, oldEntity.width, newPosition, oldEntity.speed);

                    output.push(updatedEntity);
            }
            return output;
        }
        return [];
    }
}
