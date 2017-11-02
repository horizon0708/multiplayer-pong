"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var properties = require("../core/gameProperties");
var entityInterpolation_1 = require("./entityInterpolation");
var Renderer = /** @class */ (function () {
    function Renderer(playerId, serverUpdates, clientInputs, enableInterp, enableClientPrediction) {
        this.enableInterp = true;
        this.enableClientPrediction = false;
        this.fps = 60;
        this.framesThisSecond = 0;
        this.lastFpsUpdate = 0;
        this.playerId = playerId;
        this.serverUpdates = serverUpdates;
        this.enableInterp = enableInterp;
        this.enableClientPrediction = enableClientPrediction;
        this.fpsDisplay = document.getElementById('fpsDisplay');
        this.clientInputs = clientInputs;
        this.Interpolater = new entityInterpolation_1.default();
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
    }
    Renderer.prototype.startRender = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.renderLoop(performance.now()); });
    };
    Renderer.prototype.renderLoop = function (timestamp) {
        var _this = this;
        if (this.enableInterp && this.enableClientPrediction) {
            this.interpolate();
            this.renderWithClientPrediction(this.clientPredictionFrames[this.clientPredictionFrames.length - 1], this.interpolatedFrames[this.interpolatedFrames.length - 1]);
        }
        else if (this.enableInterp && !this.enableClientPrediction) {
            this.interpolate();
            this.render(this.interpolatedFrames[this.interpolatedFrames.length - 1]);
        }
        else if (!this.enableInterp && this.enableClientPrediction) {
            this.renderWithClientPrediction(this.clientPredictionFrames[this.clientPredictionFrames.length - 1], this.serverUpdates[this.serverUpdates.length - 1]);
        }
        else {
            this.render(this.serverUpdates[this.serverUpdates.length - 1].et);
        }
        this.drawFPS(timestamp);
        requestAnimationFrame(function () { return _this.renderLoop; });
    };
    Renderer.prototype.drawEntity = function (name, position) {
        if (name === "paddle") {
            this.ctx.beginPath();
            this.ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            this.ctx.fill();
            this.ctx.closePath();
        }
        if (name === "ball") {
            this.ctx.beginPath();
            this.ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            this.ctx.fill();
            this.ctx.closePath();
        }
    };
    Renderer.prototype.render = function (entities) {
        var _this = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        entities.forEach(function (entity) {
            _this.drawEntity(entity.name, entity.position);
        });
    };
    Renderer.prototype.drawFPS = function (timestamp) {
        if (timestamp > this.lastFpsUpdate + 1000) {
            this.fps = 0.25 * this.framesThisSecond + (1 - 0.25) * this.fps; // compute the new FPS
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
        }
        this.framesThisSecond++;
        this.fpsDisplay.innerHTML = Math.round(this.fps) + ' FPS';
    };
    Renderer.prototype.renderWithClientPrediction = function (playerState, worldState) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderPlayer(playerState);
        this.renderExceptPlayer(worldState);
    };
    Renderer.prototype.renderPlayer = function (playerState) {
        this.drawEntity(playerState.name, playerState.position);
    };
    Renderer.prototype.renderExceptPlayer = function (entities) {
        var _this = this;
        var world = entities.filter(function (x) { return x.id !== _this.playerId; });
        world.forEach(function (x) { return _this.drawEntity(x.name, x.position); });
    };
    Renderer.prototype.interpolate = function () {
        var newFrame = this.Interpolater.interpolate(this.serverUpdates);
        this.interpolatedFrames.push(newFrame);
        if (this.interpolatedFrames.length > 10) {
            this.interpolatedFrames.shift();
        }
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map