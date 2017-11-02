import IServerCommHandler from "./interface/IServerCommHandler";
import GameServer from "./gameServer";
import * as gameProperties from '../core/gameProperties';

export default class SimulatedCommHandlerServer implements IServerCommHandler{

    constructor(gameServer){
        this.gameServer = gameServer;
        this.send();
        this.sendGameDataEvent = new CustomEvent('serverUpdate', {detail: this.gameServer.simulator.gameState})
        document.addEventListener('inputUpdate', (e)=>this.listen(e), false);
    }
    sendGameDataEvent: CustomEvent;
    gameServer : GameServer;

    listen(e) {
        this.gameServer.inputQueue = e.detail;
    }

    send() {
        setInterval(()=> document.dispatchEvent(this.sendGameDataEvent), gameProperties.serverTimestep);
    }

}