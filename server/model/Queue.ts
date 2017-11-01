export default class Queue<T> {
    constructor() {
        this.list = [];
    }

    public list: T[];

    public Next(): any {
        const output = this.list[0];
        this.list.shift();
        return output;
    }

    public Add(item: any): void {
        this.list.push(item);
    }

    public AddRange(items : any[]) :void {
        for(let i=0; i < items.length; i++){
            this.list.push(items[i]);
        }
    }

    public Peek(): any {
        return this.list[0];
    }

    public PeekEnd(): any {
        return this.list[this.list.length -1 ];
    }
}