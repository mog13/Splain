export default class Dictionary {
    constructor() {
        this.entries = {};
    }

    addEntry(JSONEntry, name) {
        if (name) {
            this.entries[name] = JSONEntry;
        }
        else {
            Object.keys(JSONEntry).forEach((key) => {
                this.addEntry(JSONEntry[key], key);
            });
        }
    }

    processWeights(entry) {
        if (entry !== null && Array.isArray(entry)) {
            let index;
            while ((index = entry.findIndex(value => value.hasOwnProperty("weight"))) !== -1) {
                let weightedValues = [];
                for (let i = 0; i < entry[index].weight; i++) {
                    weightedValues.push(entry[index].value);
                }
                entry.splice(index, 1, ...weightedValues);
            }
        }
        return entry;
    }

    getEntry(name, explicit) {
        if (typeof explicit === typeof undefined) explicit = true;
        if (!name.includes(".")) {
            return this.processWeights(this.entries[name]);
        }

        let path = name.split(".");

        let entry = path.reduce((currentStep, nextStep) => {
            if (currentStep === null) return null;
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
        if (explicit && Array.isArray(entry) === false) {
            console.warn("entry was not found explicitly or was not array, make sure entry is valid or call with explicit off ");
            return null;
        }

        return entry;
    }
}
