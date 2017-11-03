"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var reflector_1 = require("./reflector");
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
    var reflector = new reflector_1.default(server);
}
exports.main = main;
//# sourceMappingURL=index.js.map