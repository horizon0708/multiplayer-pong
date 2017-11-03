"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimulatedCommHandler_server_1 = require("./SimulatedCommHandler-server");
var gameSimulation_1 = require("./gameSimulation");
var GameServer = /** @class */ (function () {
    function GameServer(simulated) {
        this.inputQueue = [];
        this.simulator = new gameSimulation_1.default(this);
        this.simulated = simulated;
        this.startCommHandler();
        this.simulator.start();
    }
    GameServer.prototype.startCommHandler = function () {
        if (this.simulated) {
            this.commHandler = new SimulatedCommHandler_server_1.default(this);
        }
        else {
            // initialize real comm handler
        }
    };
    return GameServer;
}());
exports.default = GameServer;
//# sourceMappingURL=gameServer.js.map