export default class Dictioanry {
    constructor() {
        this.entries = {};
    }

    addEntry(JSONEntry, name) {
        if (name) {
            this.entries[name] = JSONEntry;
        }
        else if (Object.keys(JSONEntry).length === 1) {
            this.entries[Object.keys(JSONEntry)[0]] = JSONEntry;
        }
        else throw "JSON did not have single root property expected single root property or given name";
    }
}