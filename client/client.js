"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var SimulatedCommHandler_client_1 = require("./SimulatedCommHandler-client");
var inputHandler_1 = require("./inputHandler");
var Client = /** @class */ (function () {
    function Client(id) {
        if (id === void 0) { id = ''; }
        this.id = id;
        this.serverUpdates = [];
        this.clientInputs = [];
        this.renderer = new renderer_1.default('one', this, this.serverUpdates, this.clientInputs, false, false);
        this.renderer.startRender();
        this.commHandler = new SimulatedCommHandler_client_1.default(this);
        this.inputHandler = new inputHandler_1.default(this);
    }
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=client.js.map