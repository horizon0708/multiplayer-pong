import * as Physics from './physics';
import * as GameProperties from './gameProperties';
import 'mocha';
import PaddleData from "./model/PaddleData";
import Paddle from "./paddle";
import Vector from "./vector";

const expect = require('chai').expect;
const paddleData = new PaddleData('mockId', true, 1, true);
const idDoesNotExist = new PaddleData('doesNotExist', true, 1, true);
const paddle = new Paddle('mockId','paddle', new Vector(0, 0));
const oldState = [ paddle ];

describe('Paddle Movement', () => {
    it('should not move the paddle if the ids does not match', () => {
        const result = Physics.PaddleMovement(idDoesNotExist, oldState);
        const paddle = oldState[0];
        expect(paddle.position.y).to.equal(0);
    });

    it('Up should increase position.y by paddle speed', () => {
        const result = Physics.PaddleMovement(paddleData, oldState);
        const paddle = oldState[0];
        expect(paddle.position.y).to.equal(paddle.speed);
    });

});