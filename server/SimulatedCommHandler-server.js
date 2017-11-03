"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameProperties = require("../core/gameProperties");
var Socket = require("../core/constants/socket");
var io = require("socket.io-client");
var SimulatedCommHandlerServer = /** @class */ (function () {
    function SimulatedCommHandlerServer(gameServer) {
        this.gameServer = gameServer;
        this.send();
        this.socket = io();
    }
    SimulatedCommHandlerServer.prototype.listen = function (e) {
        var _this = this;
        this.socket.on(Socket.inputUpdate, function (data) { return _this.gameServer.inputQueue = data; });
        if (this.gameServer.inputQueue.length > 0) {
            //console.log(this.gameServer.inputQueue);
        }
    };
    SimulatedCommHandlerServer.prototype.send = function () {
        var _this = this;
        setInterval(function (x) { return _this.socket.emit(Socket.serverUpdate, _this.gameServer.simulator.gameState); }, gameProperties.physicsTimestep);
    };
    return SimulatedCommHandlerServer;
}());
exports.default = SimulatedCommHandlerServer;
//# sourceMappingURL=SimulatedCommHandler-server.js.map