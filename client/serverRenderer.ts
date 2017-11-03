import Renderer from "./renderer";
import InputHandler from "./inputHandler";
import ServerRendererNetworkHandler from "./serverRendererNetworkHandler";

export default class ServerRenderer {
    constructor(playerId, server){
        this.renderer = new Renderer(playerId,this,this.serverUpdates, this.clientInputs, false , false, 'rgba(64, 201, 153, 0.5)');
        this.renderer.startRender();
        this.commHandler = new ServerRendererNetworkHandler(this, server);
    }
    public serverUpdates = [];
    public clientInputs = [];
    public renderer: Renderer;
    public commHandler: any;
    public inputHandler: InputHandler;
}