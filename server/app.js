"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.mountRoutes();
        console.log("app");
    }
    App.prototype.mountRoutes = function () {
        this.express.get('/', function (req, res) {
            res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
        });
        this.express.use('/', express.static(path.join(__dirname, '../dist')));
    };
    return App;
}());
exports.default = new App().express;
//# sourceMappingURL=app.js.map