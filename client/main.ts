import Client from "./client";
import GameServer from "../server/gameServer";
import ServerRenderer from "./serverRenderer";

//const clientTwo = new Client("two");
const server = new GameServer(true);
const clientOne = new Client("one");
const renderer = new ServerRenderer("server", server);

