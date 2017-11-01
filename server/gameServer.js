"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameSimulation_1 = require("./gameSimulation");
var socketIo = require("socket.io");
var gameData_1 = require("./model/gameData");
var gameProperties = require("../core/gameProperties");
var gameInputHandler = require("./gameInputHandler");
var InputQueue_1 = require("./model/InputQueue");
var GameServer = /** @class */ (function () {
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
            socket.emit("id", socket.id);
            _this.simulation.assignPlayer(socket.id);
            _this.players.push(socket);
            _this.inputQueues.push(new InputQueue_1.default(socket.id));
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
            socket.on('move', function (data) {
                // find the player's inputQueue
                var playerQueue = _this.inputQueues.find(function (x) { return x.playerId === data.id; });
                if (playerQueue) {
                    var processedMovement = gameInputHandler.validate(data, playerQueue);
                    // if the movement is valid, add to InputQueue and tell the client that it was accepted
                    if (processedMovement.ack) {
                        playerQueue.Add(processedMovement);
                        socket.emit('moveOk', processedMovement.ts);
                    }
                }
            });
        });
    };
    GameServer.prototype.send = function () {
        var _this = this;
        this.updateLoop = setInterval(function () { return _this.sendGameData(); }, gameProperties.serverTimestep);
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