import IServerCommHandler from "./interface/IServerCommHandler";
import GameServer from "./gameServer";

import * as gameProperties from '../core/constants/gameProperties';
import * as Socket from '../core/constants/socket';
const io = require("socket.io-client");


export default class SimulatedCommHandlerServer implements IServerCommHandler{

    constructor(gameServer){
        this.gameServer = gameServer;
        this.send();
        this.socket = io();
        this.listen();

    }
    socket;
    gameServer : GameServer;

    listen() {
        this.socket.on(Socket.inputUpdate, data=> {
            setTimeout(()=>{
                this.gameServer.inputQueue = data});

        }, gameProperties.lag /2);

        if(this.gameServer.inputQueue.length > 0){
            //console.log(this.gameServer.inputQueue);
        }
    }

    send() {
        setInterval((x)=> this.socket.emit(Socket.serverUpdate, {ts:'', et:this.gameServer.simulator.gameState}), gameProperties.serverTimestep );
    }
}