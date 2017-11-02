import ICommHandler from "./interface/ICommHandler";
import * as gameProperties from '../core/gameProperties';

export default class SimulatedCommHandlerClient implements ICommHandler {
    constructor(serverUpdates, clientInputs){
        this.serverUpdates = serverUpdates;
        this.clientInputs = clientInputs;
        this.sendInputDataEvent = new CustomEvent('inputUpdate', { detail: this.clientInputs });
        document.addEventListener('serverUpdate', (e)=>this.GetServerUpdates(e), false);
    }

    sendInputDataEvent;
    serverUpdates;
    clientInputs;

    GetServerUpdates(e) {
        console.log(e.detail);
    }

    SendInputs() {
        setInterval(()=> document.dispatchEvent(this.sendInputDataEvent), gameProperties.serverTimestep);
    }

    GetPing() {
    }
}