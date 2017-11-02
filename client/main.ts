import Client from "./client";
import GameServer from "../server/gameServer";

const clientOne = new Client();
const server = new GameServer(true, [clientOne]);