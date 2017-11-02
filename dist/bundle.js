/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ballRadius = 5;
exports.gameWidth = 660;
exports.gameHeight = 440;
exports.physicsTimestep = 1000 / 60;
exports.serverTimestep = 1000 / 10;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
exports.default = Vector;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Ball = /** @class */ (function () {
    function Ball(id, name, position, direction) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.direction = direction;
        this.speed = 10;
    }
    return Ball;
}());
exports.default = Ball;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __webpack_require__(4);
var gameServer_1 = __webpack_require__(8);
var clientOne = new client_1.default();
var server = new gameServer_1.default(true, [clientOne]);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = __webpack_require__(5);
var SimulatedCommHandler_client_1 = __webpack_require__(7);
var Client = /** @class */ (function () {
    function Client() {
        this.renderer = new renderer_1.default('one', this.serverUpdates, this.clientInputs, true, false);
        this.renderer.startRender();
        this.commHandler = new SimulatedCommHandler_client_1.default(this.serverUpdates, this.clientInputs);
    }
    return Client;
}());
exports.default = Client;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var properties = __webpack_require__(0);
var entityInterpolation_1 = __webpack_require__(6);
var Renderer = /** @class */ (function () {
    function Renderer(playerId, serverUpdates, clientInputs, enableInterp, enableClientPrediction) {
        this.enableInterp = true;
        this.enableClientPrediction = false;
        this.fps = 60;
        this.framesThisSecond = 0;
        this.lastFpsUpdate = 0;
        this.playerId = playerId;
        this.serverUpdates = serverUpdates;
        this.enableInterp = enableInterp;
        this.enableClientPrediction = enableClientPrediction;
        this.fpsDisplay = document.getElementById('fpsDisplay');
        this.clientInputs = clientInputs;
        this.Interpolater = new entityInterpolation_1.default();
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
    }
    Renderer.prototype.startRender = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.renderLoop(performance.now()); });
    };
    Renderer.prototype.renderLoop = function (timestamp) {
        var _this = this;
        if (this.enableInterp && this.enableClientPrediction) {
            this.interpolate();
            this.renderWithClientPrediction(this.clientPredictionFrames[this.clientPredictionFrames.length - 1], this.interpolatedFrames[this.interpolatedFrames.length - 1]);
        }
        else if (this.enableInterp && !this.enableClientPrediction) {
            this.interpolate();
            this.render(this.interpolatedFrames[this.interpolatedFrames.length - 1]);
        }
        else if (!this.enableInterp && this.enableClientPrediction) {
            this.renderWithClientPrediction(this.clientPredictionFrames[this.clientPredictionFrames.length - 1], this.serverUpdates[this.serverUpdates.length - 1]);
        }
        else {
            this.render(this.serverUpdates[this.serverUpdates.length - 1].et);
        }
        this.drawFPS(timestamp);
        requestAnimationFrame(function () { return _this.renderLoop; });
    };
    Renderer.prototype.drawEntity = function (name, position) {
        if (name === "paddle") {
            this.ctx.beginPath();
            this.ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            this.ctx.fill();
            this.ctx.closePath();
        }
        if (name === "ball") {
            this.ctx.beginPath();
            this.ctx.arc(position.x, position.y, properties.ballRadius, 0, 360);
            this.ctx.fill();
            this.ctx.closePath();
        }
    };
    Renderer.prototype.render = function (entities) {
        var _this = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        entities.forEach(function (entity) {
            _this.drawEntity(entity.name, entity.position);
        });
    };
    Renderer.prototype.drawFPS = function (timestamp) {
        if (timestamp > this.lastFpsUpdate + 1000) {
            this.fps = 0.25 * this.framesThisSecond + (1 - 0.25) * this.fps; // compute the new FPS
            this.lastFpsUpdate = timestamp;
            this.framesThisSecond = 0;
        }
        this.framesThisSecond++;
        this.fpsDisplay.innerHTML = Math.round(this.fps) + ' FPS';
    };
    Renderer.prototype.renderWithClientPrediction = function (playerState, worldState) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderPlayer(playerState);
        this.renderExceptPlayer(worldState);
    };
    Renderer.prototype.renderPlayer = function (playerState) {
        this.drawEntity(playerState.name, playerState.position);
    };
    Renderer.prototype.renderExceptPlayer = function (entities) {
        var _this = this;
        var world = entities.filter(function (x) { return x.id !== _this.playerId; });
        world.forEach(function (x) { return _this.drawEntity(x.name, x.position); });
    };
    Renderer.prototype.interpolate = function () {
        var newFrame = this.Interpolater.interpolate(this.serverUpdates);
        this.interpolatedFrames.push(newFrame);
        if (this.interpolatedFrames.length > 10) {
            this.interpolatedFrames.shift();
        }
    };
    return Renderer;
}());
exports.default = Renderer;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = __webpack_require__(1);
var gameProperties = __webpack_require__(0);
var ball_1 = __webpack_require__(2);
var EntityInterpolation = /** @class */ (function () {
    function EntityInterpolation() {
        this.timeSinceLastServerUpdate = 0;
    }
    EntityInterpolation.prototype.resetTimeSinceLastServerUpdate = function () {
        this.timeSinceLastServerUpdate = 0;
    };
    ;
    EntityInterpolation.prototype.interpolate = function (serverUpdates) {
        var output = [];
        if (serverUpdates.length > 1) {
            var newGameState = serverUpdates[serverUpdates.length - 1];
            var oldGameState = serverUpdates[serverUpdates.length - 2];
            this.timeSinceLastServerUpdate = performance.now() - newGameState.ts;
            var lerpRatio = this.timeSinceLastServerUpdate / gameProperties.serverTimestep;
            var _loop_1 = function (i) {
                var oldEntity = oldGameState.et[i];
                if (oldEntity.id === "ball") {
                    var newEntity = newGameState.et.find(function (x) { return x.id === oldEntity.id; });
                    var dx = newEntity.position.x - oldEntity.position.x;
                    var dy = newEntity.position.y - oldEntity.position.y;
                    var newPosition = new vector_1.default(oldEntity.position.x + dx * lerpRatio, oldEntity.position.y + dy * lerpRatio);
                    var updatedEntity = new ball_1.default(newEntity.id, newEntity.name, newPosition, newEntity.direction);
                    output.push(updatedEntity);
                }
                else if (oldEntity.id !== this_1.playerId) {
                    // render other player
                }
                else {
                    output.push(oldEntity);
                }
            };
            var this_1 = this;
            for (var i = 0; i < oldGameState.et.length; i++) {
                _loop_1(i);
            }
            return output;
        }
        return [];
    };
    return EntityInterpolation;
}());
exports.default = EntityInterpolation;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SimulatedCommHandler_server_1 = __webpack_require__(9);
var gameSimulation_1 = __webpack_require__(10);
var GameServer = /** @class */ (function () {
    function GameServer(simulated, clients) {
        if (clients === void 0) { clients = []; }
        this.clients = clients;
        this.simulator = new gameSimulation_1.default();
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gameProperties = __webpack_require__(0);
var SimulatedCommHandlerServer = /** @class */ (function () {
    function SimulatedCommHandlerServer(gameServer) {
        this.gameServer = gameServer;
        this.listen();
        this.send();
        this.sendGameDataEvent = new CustomEvent('serverUpdate', { detail: this.gameServer.simulator.gameState });
    }
    SimulatedCommHandlerServer.prototype.listen = function () {
    };
    SimulatedCommHandlerServer.prototype.send = function () {
        var _this = this;
        setInterval(function () { return document.dispatchEvent(_this.sendGameDataEvent); }, gameProperties.serverTimestep);
    };
    SimulatedCommHandlerServer.prototype.sendGameData = function () {
    };
    return SimulatedCommHandlerServer;
}());
exports.default = SimulatedCommHandlerServer;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ball_1 = __webpack_require__(2);
var vector_1 = __webpack_require__(1);
var Physics = __webpack_require__(11);
var GameProperties = __webpack_require__(0);
var paddle_1 = __webpack_require__(12);
var gameEntities = [
    new ball_1.default('ball', 'ball', new vector_1.default(100, 100), new vector_1.default(1, 1)),
    new paddle_1.default('unassigned', 'paddle', new vector_1.default(60, 150))
];
var GameSimulation = /** @class */ (function () {
    function GameSimulation() {
        this.gameState = gameEntities;
        this.deltaTime = 0;
        this.lastFrameTimeMs = 0;
    }
    GameSimulation.prototype.start = function () {
        var _this = this;
        this.physicsLoop = setInterval(function () { return _this.serverUpdate(_this.gameState); }, GameProperties.physicsTimestep); // 10 tick
    };
    GameSimulation.prototype.serverUpdate = function (state) {
        // go through and apply all inputs
        // handle phyics ( ball movements, collision )
        Physics.update(state);
        // this.deltaTime += timestamp - this.lastFrameTimeMs; // get the delta time since last frame
        // this.lastFrameTimeMs = timestamp;
        // while (this.deltaTime >= GameProperties.physicsTimestep) {
        //      this.deltaTime -= GameProperties.physicsTimestep;
        // }
    };
    GameSimulation.prototype.assignPlayer = function (playerId) {
        var index = gameEntities.findIndex(function (x) { return x.id === 'unassigned'; });
        if (index > 0) {
            gameEntities[index].id = playerId;
        }
    };
    GameSimulation.prototype.stop = function () {
        clearInterval(this.physicsLoop);
        this.gameState = gameEntities;
    };
    return GameSimulation;
}());
exports.default = GameSimulation;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gameProperties = __webpack_require__(0);
function update(entities) {
    ballBounceOffLeftAndRight(true, entities);
    ballBounceOffTopAndBottom(true, entities);
    ballMovement(entities);
}
exports.update = update;
function ballMovement(entities) {
    var ball = entities.find(function (x) { return x.id === "ball"; });
    if (!ball) {
        return;
    }
    ball.position.x += ball.direction.x * ball.speed;
    ball.position.y += ball.direction.y * ball.speed;
}
exports.ballMovement = ballMovement;
function ballBounceOffTopAndBottom(enabled, entities) {
    if (enabled) {
        var ball = entities.find(function (x) { return x.id === "ball"; });
        if (ball.position.y + ball.direction.y * ball.speed > gameProperties.gameHeight - gameProperties.ballRadius
            || ball.position.y + ball.direction.y * ball.speed < gameProperties.ballRadius) {
            ball.direction.y = -ball.direction.y;
        }
    }
}
exports.ballBounceOffTopAndBottom = ballBounceOffTopAndBottom;
function ballBounceOffLeftAndRight(enabled, entities) {
    if (enabled) {
        var ball = entities.find(function (x) { return x.id === "ball"; });
        if (ball.position.x + ball.direction.x * ball.speed > gameProperties.gameWidth - gameProperties.ballRadius
            || ball.position.x + ball.direction.x * ball.speed < gameProperties.ballRadius) {
            ball.direction.x = -ball.direction.x;
        }
    }
}
exports.ballBounceOffLeftAndRight = ballBounceOffLeftAndRight;
function PaddleMovement(paddleData, entities) {
    var player = entities.find(function (x) { return x.id === paddleData.id; });
    if (player) {
        if (paddleData.up) {
            player.position.y += player.speed;
        }
        else {
            player.position.y -= player.speed;
        }
    }
    return entities;
}
exports.PaddleMovement = PaddleMovement;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Paddle = /** @class */ (function () {
    function Paddle(id, name, position) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.speed = 10;
    }
    return Paddle;
}());
exports.default = Paddle;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map