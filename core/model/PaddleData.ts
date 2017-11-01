export default class PaddleData {
    constructor(id: string, up:boolean, ts:number, ack: boolean) {
        this.id = id;
        this.up = up;
        this.ts = ts;
        this.ack = ack;
    }
    public id: string;
    public up: boolean;
    public ts: number;
    public ack: boolean;
}