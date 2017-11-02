import SimulatedCommHandlerServer from "./SimulatedCommHandler-server";
import Client from "../client/client";
import GameSimulation from "./gameSimulation";

export default class GameServer{
    constructor(simulated, private clients: Client[] = []){
        this.simulator = new GameSimulation();
        this.simulated = simulated;
        this.startCommHandler();
        this.simulator.start();

    }
    public commHandler;
    public simulated;
    public simulator : GameSimulation;
    public inputQueue

    private startCommHandler(){
        if(this.simulated){
            this.commHandler = new SimulatedCommHandlerServer(this);
        } else {
            // initialize real comm handler
        }
    }

}