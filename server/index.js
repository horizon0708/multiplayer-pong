"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var gameServer_old_1 = require("./gameServer-old");
var port = process.env.PORT || 2000;
var server = require('http').Server(app_1.default);
function main() {
    server.listen(port, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("test");
        return console.log("server is listening on " + port);
    });
    var gameServer = new gameServer_old_1.default(server);
}
exports.main = main;
//# sourceMappingURL=index.js.map