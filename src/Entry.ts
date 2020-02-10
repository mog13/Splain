import {Token} from "./Token";

export class Entry {
    value: string;
    contexts: object;
    weight: number;
    computedWeight: number = 0;
    lastWeighed: number = -1;

    constructor(value: string, contexts: object = {}, weight: number = 1) {
        this.value = value;
        this.contexts = contexts;
        this.weight = weight;
    }
}

