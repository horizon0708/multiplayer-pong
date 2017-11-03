import Renderer from "./renderer";
import ClientNetworkHandler from "./clientNetworkHandler";
import InputHandler from "./inputHandler";

export default class Client {
    constructor(public id:string = ''){
        this.renderer = new Renderer('one',this,this.serverUpdates, this.clientInputs, true , false);
        this.renderer.startRender();
        this.commHandler = new ClientNetworkHandler(this);
        this.inputHandler = new InputHandler(this);
    }
    public serverUpdates = [];
    public clientInputs = [];
    public renderer: Renderer;
    public commHandler: any;
    public inputHandler: InputHandler;


}