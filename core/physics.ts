import * as  gameProperties from './gameProperties';
import Entity from "./entity";
import Ball from "./ball";
import Paddle from "./paddle";
import PaddleData from "./model/PaddleData";

export function update(entities: Entity[]): void {
    ballBounceOffLeftAndRight(true, entities);
    ballBounceOffTopAndBottom(true, entities);
    ballMovement(entities);
}

export function ballMovement(entities: Entity[]): void {
    const ball = <Ball>entities.find(x=> x.id === "ball");
    if(!ball){
        return;
    }
    ball.position.x += ball.direction.x * ball.speed;
    ball.position.y += ball.direction.y * ball.speed;
}

export function ballBounceOffTopAndBottom(enabled: boolean, entities: Entity[]){
    if(enabled){
        const ball = <Ball>entities.find(x=> x.id === "ball");
        if(ball.position.y + ball.direction.y * ball.speed  > gameProperties.gameHeight - gameProperties.ballRadius
            || ball.position.y + ball.direction.y * ball.speed  < gameProperties.ballRadius) {
            ball.direction.y = -ball.direction.y;
        }
    }
}

export function ballBounceOffLeftAndRight(enabled: boolean, entities: Entity[]){
    if(enabled){
        const ball = <Ball>entities.find(x=> x.id === "ball");
        if(ball.position.x + ball.direction.x * ball.speed > gameProperties.gameWidth - gameProperties.ballRadius
            || ball.position.x + ball.direction.x * ball.speed < gameProperties.ballRadius) {
            ball.direction.x = -ball.direction.x;
        }
    }
}

export function PaddleMovement(paddleData: PaddleData, entities: Entity[]) : Entity[]{
    const player = <Paddle>entities.find(x => x.id === paddleData.id);
    if(player) {
        if (paddleData.up) {
            player.position.y += player.speed;
        } else {
            player.position.y -= player.speed;
        }
    }
    return entities;
}



