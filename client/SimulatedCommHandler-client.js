"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimulatedCommHandlerClient = /** @class */ (function () {
    function SimulatedCommHandlerClient(serverUpdates, clientInputs) {
        var _this = this;
        this.serverUpdates = serverUpdates;
        this.clientInputs = clientInputs;
        this.testEvent = new CustomEvent('build', { detail: "test" });
        document.addEventListener('build', function (e) { return _this.test(e); }, false);
        document.dispatchEvent(this.testEvent);
        document.addEventListener('serverUpdate', function (e) { return _this.GetServerUpdates(e); }, false);
    }
    SimulatedCommHandlerClient.prototype.test = function (e) {
        console.log(e.detail);
    };
    SimulatedCommHandlerClient.prototype.GetServerUpdates = function (e) {
        console.log(e.detail);
    };
    SimulatedCommHandlerClient.prototype.SendInputs = function () {
    };
    SimulatedCommHandlerClient.prototype.GetPing = function () {
    };
    return SimulatedCommHandlerClient;
}());
exports.default = SimulatedCommHandlerClient;
//# sourceMappingURL=SimulatedCommHandler-client.js.map