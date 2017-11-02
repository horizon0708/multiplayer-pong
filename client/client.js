"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var SimulatedCommHandler_client_1 = require("./SimulatedCommHandler-client");
var Client = /** @class */ (function () {
    function Client() {
        this.renderer = new renderer_1.default('one', this.serverUpdates, this.clientInputs, true, false);
        this.renderer.startRender();
        this.commHandler = new SimulatedCommHandler_client_1.default(this.serverUpdates, this.clientInputs);
    }
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=client.js.map