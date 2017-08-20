export default class Dictioanry {
    constructor() {
        this.entries = {};
    }

    addEntry(JSONEntry, name) {
        if (name) {
            this.entries[name] = JSONEntry;
        }
        else if (Object.keys(JSONEntry).length === 1) {
            this.entries[Object.keys(JSONEntry)[0]] = JSONEntry[Object.keys(JSONEntry)[0]];
        }
        else throw "JSON did not have single root property expected single root property or given name";
    }

    getEntry(name, explicit) {
        if (typeof explicit === typeof undefined) explicit = true;
        if (!name.includes(".")) {
            return this.entries[name];
        }

        let path = name.split(".");

        let entry = path.reduce((currentStep, nextStep) => {
            if(currentStep === null) return null;
            let curObj = currentStep[nextStep];
            if (curObj) {
                return curObj;
            }
            else {
                if (!explicit) return currentStep;
                else {
                    return null;
                }
            }
        }, this.entries);
        if(explicit && Array.isArray(entry) === false) {
            console.warn("entry was not found explicitly or was not array, make sure entry is valid or call with explicit off ");
            return null;
        }

        return entry;
    }
}