import * as socketIo from "socket.io";
import * as Socket from "../core/constants/socket";

export default class Reflector{
    constructor(server){
        this.server = server;
        this.io =  socketIo(server);
        this.listen();
    }
    // return all the message back to the client
    server;
    io;

    private listen(){
        this.io.on('connection', socket => {
            console.log("client connected");

           socket.on(Socket.serverUpdate, data =>{
               this.io.emit(Socket.serverUpdate, data);
           });

           socket.on(Socket.gameStart, data=>{
               this.io.emit(Socket.gameStart, data);
           });
            socket.on(Socket.inputUpdate, data => {
                this.io.emit(Socket.inputUpdate, data);
            })
        });
    }
}