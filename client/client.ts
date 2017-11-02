import Renderer from "./renderer";
import ICommHandler from "./interface/ICommHandler";
import SimulatedCommHandlerClient from "./SimulatedCommHandler-client";

export default class Client {
    constructor(){
        this.renderer = new Renderer('one',this.serverUpdates, this.clientInputs, true, false);
        this.renderer.startRender();
        this.commHandler = new SimulatedCommHandlerClient(this.serverUpdates,this.clientInputs, );
    }
    private serverUpdates;
    private clientInputs;
    private renderer: Renderer;
    public commHandler: ICommHandler;
}