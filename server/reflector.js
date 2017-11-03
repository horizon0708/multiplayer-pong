"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var Socket = require("../core/constants/socket");
var Reflector = /** @class */ (function () {
    function Reflector(server) {
        this.server = server;
        this.io = socketIo(server);
        this.listen();
    }
    Reflector.prototype.listen = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            console.log("client connected");
            socket.on(Socket.serverUpdate, function (data) {
                _this.io.emit(Socket.serverUpdate, data);
            });
            socket.on(Socket.gameStart, function (data) {
                _this.io.emit(Socket.gameStart, data);
            });
            socket.on(Socket.inputUpdate, function (data) {
                _this.io.emit(Socket.inputUpdate, data);
            });
        });
    };
    return Reflector;
}());
exports.default = Reflector;
//# sourceMappingURL=reflector.js.map