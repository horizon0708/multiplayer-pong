import * as gameProperties from '../core/constants/gameProperties';
import * as Socket from '../core/constants/socket';
import Client from "./client";
const io = require("socket.io-client");

export default class ClientNetworkHandler{
    public client: Client;
    public socket: any;
    constructor(client){
        this.client = client;
        this.socket = io();
        this.GetServerUpdates();
        this.SendInputs();
    }

    GetServerUpdates(){
        this.socket.on(Socket.serverUpdate, data =>{
            setTimeout(()=>{
                data.ts = performance.now();
                this.client.serverUpdates.push(data);
                if(this.client.serverUpdates.length > 10){
                    this.client.serverUpdates.shift();
                }
            }, gameProperties.lag / 2);
        })
    }

    SendInputs(){
        setInterval(()=> this.sendInputsAndClear(), gameProperties.serverTimestep);
    }

    sendInputsAndClear(){
        this.socket.emit(Socket.inputUpdate, this.client.clientInputs);
        this.client.clientInputs = [];
    }
}