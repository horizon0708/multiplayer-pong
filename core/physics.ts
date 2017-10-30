import * as  gameProperties from './gameProperties';
import Entity from "./entity";
import Ball from "./ball";

export function update(entities: Entity[]): void {
    ballBounceOffLeftAndRight(true, entities);
    ballBounceOffTopAndBottom(true, entities);
    ballMovement(entities);
}

function ballMovement(entities: Entity[]): void {
    const ball = <Ball>entities.find(x=> x.id === "ball");
    if(!ball){
        return;
    }
    ball.position.x += ball.direction.x * ball.speed;
    ball.position.y += ball.direction.y * ball.speed;
}

function ballBounceOffTopAndBottom(enabled: boolean, entities: Entity[]){
    if(enabled){
        const ball = <Ball>entities.find(x=> x.id === "ball");
        if(ball.position.y + ball.direction.y * ball.speed  > gameProperties.gameHeight - gameProperties.ballRadius
            || ball.position.y + ball.direction.y * ball.speed  < gameProperties.ballRadius) {
            ball.direction.y = -ball.direction.y;
        }
    }
}

function ballBounceOffLeftAndRight(enabled: boolean, entities: Entity[]){
    if(enabled){
        const ball = <Ball>entities.find(x=> x.id === "ball");
        if(ball.position.x + ball.direction.x * ball.speed > gameProperties.gameWidth - gameProperties.ballRadius
            || ball.position.x + ball.direction.x * ball.speed < gameProperties.ballRadius) {
            ball.direction.x = -ball.direction.x;
        }
    }
}