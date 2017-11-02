"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
var gameServer_1 = require("../server/gameServer");
var clientOne = new client_1.default();
var server = new gameServer_1.default(true, [clientOne]);
//# sourceMappingURL=main.js.map