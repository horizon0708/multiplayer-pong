import app from './app';
import GameServer from "./gameServer-old";

const port = process.env.PORT || 2000;
const server = require('http').Server(app);

export function main(): void{
    server.listen(port, (err) => {
        if (err) {
            return console.log(err)
        }
        console.log("test");
        return console.log(`server is listening on ${port}`)
    });

    const gameServer = new GameServer(server);
}

