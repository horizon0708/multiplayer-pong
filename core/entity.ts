import Vector from './vector';

export default interface Entity {
    id: string;
    name: string;
    position: Vector;
}