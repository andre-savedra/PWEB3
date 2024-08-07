
export enum PartTypes {
    "heads", "torsos", "arms", "bases"
}

export class Part {
    id: number = 0;
    description: string = "";
    title: string = "";
    src: string = "";
    type: PartTypes = PartTypes.arms;
    cost: number = 0.0
}

export class PartsResponse {
    heads: Array<Part> = [];
    arms: Array<Part> = [];
    bases: Array<Part> = [];
    torsos: Array<Part> = [];
}

