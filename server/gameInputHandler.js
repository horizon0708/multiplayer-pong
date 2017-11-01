"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(paddleData, gameQueue) {
    // Disregard packets that are too late
    if (paddleData.ts < gameQueue.PeekEnd().ts) {
        return paddleData;
    }
    // Invalidate packets that is already validated by client
    if (paddleData.ack) {
        paddleData.ack = false;
        return paddleData;
    }
    // TODO: more validation
    paddleData.ack = true;
    return paddleData;
}
exports.validate = validate;
//# sourceMappingURL=gameInputHandler.js.map