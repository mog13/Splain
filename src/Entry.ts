export class Entry {
    value: string;
    contexts: object;
    weight: number;

    constructor(value: string, contexts: object = {}, weight: number = 1) {
        this.value = value;
        this.contexts = contexts;
        this.weight = weight;
    }
}

