import app from './app';
import Reflector from "./reflector";

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

    const reflector = new Reflector(server);
}

