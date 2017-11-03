import SimulatedCommHandlerServer from "./SimulatedCommHandler-server";
import GameSimulation from "./gameSimulation";

export default class GameServer{
    constructor(simulated){
        this.simulator = new GameSimulation(this);
        this.simulated = simulated;
        this.startCommHandler();
        this.simulator.start();

    }
    public commHandler;
    public simulated;
    public simulator : GameSimulation;
    public inputQueue = [];

    private startCommHandler(){
        if(this.simulated){
            this.commHandler = new SimulatedCommHandlerServer(this);
        } else {
            // initialize real comm handler
        }
    }

}