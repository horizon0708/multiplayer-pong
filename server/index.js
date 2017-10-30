"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var gameServer_1 = require("./gameServer");
var port = process.env.PORT || 2000;
var server = require('http').Server(app_1.default);
function main() {
    server.listen(port, function (err) {
        if (err) {
            return console.log(err);
        }
        return console.log("server is listening on " + port);
    });
    var gameServer = new gameServer_1.default(server);
    // const io = require('socket.io')(server,{});
    //
    // // listen for a connection request from any client
    // io.sockets.on('connection', function(socket){
    //     console.log("socket connected: " + socket.id);
    //     //output a unique socket.id
    // });
}
exports.main = main;
//# sourceMappingURL=index.js.map