"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameProperties = require("../core/gameProperties");
var SimulatedCommHandlerServer = /** @class */ (function () {
    function SimulatedCommHandlerServer(gameServer) {
        this.gameServer = gameServer;
        this.listen();
        this.send();
        this.sendGameDataEvent = new CustomEvent('serverUpdate', { detail: this.gameServer.simulator.gameState });
    }
    SimulatedCommHandlerServer.prototype.listen = function () {
    };
    SimulatedCommHandlerServer.prototype.send = function () {
        var _this = this;
        setInterval(function () { return document.dispatchEvent(_this.sendGameDataEvent); }, gameProperties.serverTimestep);
    };
    SimulatedCommHandlerServer.prototype.sendGameData = function () {
    };
    return SimulatedCommHandlerServer;
}());
exports.default = SimulatedCommHandlerServer;
//# sourceMappingURL=SimulatedCommHandler-server.js.map