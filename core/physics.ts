import * as  gameProperties from './constants/gameProperties';
import GameEntity from "./gameEntity";

export function update(entities: GameEntity[]): void {
    ballBounceOffLeftAndRight(true, entities);
    ballBounceOffTopAndBottom(true, entities);
    ballMovement(entities);
}

export function ballMovement(entities: GameEntity[]): void {
    const ball = entities.find(x=> x.id === "ball");
    if(!ball){
        return;
    }
    ball.position.x += ball.direction.x * ball.speed;
    ball.position.y += ball.direction.y * ball.speed;
}

export function ballBounceOffTopAndBottom(enabled: boolean, entities: GameEntity[]){
    if(enabled){
        const ball = entities.find(x=> x.id === "ball");
        if(ball.position.y + ball.direction.y * ball.speed  > gameProperties.gameHeight - gameProperties.ballRadius
            || ball.position.y + ball.direction.y * ball.speed  < gameProperties.ballRadius) {
            ball.direction.y = -ball.direction.y;
        }
    }
}

export function ballBounceOffLeftAndRight(enabled: boolean, entities: GameEntity[]){
    if(enabled){
        const ball = entities.find(x=> x.id === "ball");
        if(ball.position.x + ball.direction.x * ball.speed > gameProperties.gameWidth - gameProperties.ballRadius
            || ball.position.x + ball.direction.x * ball.speed < gameProperties.ballRadius) {
            ball.direction.x = -ball.direction.x;
        }
    }
}

export function PaddleMovement( pData: number, entities: GameEntity[]) : GameEntity[]{
    const playerId = Math.abs(pData) === 1 ? 'one': 'two';
    const player = entities.find(x => x.id === playerId);
    if(player) {
        if (pData < 0) {
            player.position.y += player.speed;
        } else {
            player.position.y -= player.speed;
        }
    }
    return entities;
}

export function SinglePaddleMovement( pData: number, entity: GameEntity) : GameEntity{
    const playerId = Math.abs(pData) === 1 ? 'one': 'two';
    const player = entity;
    if(player) {
        if (pData < 0) {
            player.position.y += player.speed;
        } else {
            player.position.y -= player.speed;
        }
    }
    return player;
}



