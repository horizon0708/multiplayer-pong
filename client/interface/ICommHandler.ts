export default interface ICommHandler {
    // connect to server

    // get server updates
    GetServerUpdates(e);
    // send inputs
    SendInputs();
    // get Ping
    GetPing();
}