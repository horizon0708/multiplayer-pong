import * as gameProperties from '../core/constants/gameProperties';
import Client from "./client";
import ClientPrediction from "./clientPrediction";

export default class InputHandler {
    constructor(client: Client) {
        document.addEventListener("keydown", (e)=> this.keyDownHandler(e), false);
        document.addEventListener("keyup", (e)=> this.keyUpHandler(e), false);
        this.client = client;
        this.inputLoop();
        this.clientPrediction = new ClientPrediction(this.client);
    }
    public clientPrediction: ClientPrediction;
    public upPressed = false;
    public downPressed = false;
    public client: Client;

    inputLoop() {
        setInterval(() => this.getInput(), gameProperties.physicsTimestep);
    }

    getInput() {
        if(this.upPressed === true){
            this.client.clientInputs.push(1);
            //this.clientPrediction.generateMovementPredictionFrame(1);
        } else if ( this.downPressed === true){
            this.client.clientInputs.push(-1);
            //this.clientPrediction.generateMovementPredictionFrame(-1);
        }
    }

    keyDownHandler(e) {
        if (e.keyCode == 38) {
            this.upPressed = true;
        }
        else if (e.keyCode == 40) {
            this.downPressed = true;
        }
    }

    keyUpHandler(e) {
        if(e.keyCode == 38) {
            this.upPressed = false;
        }
        else if(e.keyCode == 40) {
            this.downPressed = false;
        }
    }
}