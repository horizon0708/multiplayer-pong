import * as gameProperties from '../core/constants/gameProperties';
import * as Socket from '../core/constants/socket';
import Client from "./client";
import GameServer from "../server/gameServer";
const io = require("socket.io-client");

export default class ServerRendererNetworkHandler{
    public client: Client;
    public server: GameServer;
    public socket: any;
    constructor(client, server){
        this.client = client;
        this.server= server;
        this.socket = io();
        this.GetServerUpdates();
    }

    GetServerUpdates(){
        setInterval(()=> {
            this.client.serverUpdates.push({ts:'', et:this.server.simulator.gameState});
        }, gameProperties.physicsTimestep);
    }
}