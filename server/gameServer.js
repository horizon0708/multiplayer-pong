"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameSimulation_1 = require("./gameSimulation");
var socketIo = require("socket.io");
var gameData_1 = require("./model/gameData");
var GameServer = (function () {
    function GameServer(server) {
        this.players = [];
        this.server = server;
        this.io = socketIo(server);
        this.simulation = new gameSimulation_1.default();
        this.listen();
        this.send();
        //this.debug();
    }
    GameServer.prototype.listen = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            console.log("socket connected: " + socket.id);
            _this.players.push(socket);
            socket.on('disconnect', function () {
                console.log('Got disconnect!');
                var i = _this.players.indexOf(socket);
                _this.players.splice(i, 1);
                console.log(_this.players.length);
                _this.simulation.stop();
            });
            socket.on('gameStart', function (socket) {
                console.log('game start');
                _this.simulation.start();
            });
        });
    };
    GameServer.prototype.send = function () {
        var _this = this;
        this.updateLoop = setInterval(function () { return _this.sendGameData(); }, 1000 / 20);
    };
    GameServer.prototype.sendGameData = function () {
        this.io.emit('up', new gameData_1.default(this.simulation.gameState));
    };
    GameServer.prototype.debug = function () {
        var _this = this;
        setInterval(function () { return console.log(_this.simulation.gameState); }, 2000);
    };
    return GameServer;
}());
exports.default = GameServer;
//# sourceMappingURL=gameServer.js.map