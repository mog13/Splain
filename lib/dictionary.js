export default class Dictionary {
    constructor() {
        this.entries = {};
    }

    addEntry(JSONEntry, name, dictionaryContext) {
        let contextualEntries = this.getContextualEntries(dictionaryContext);
        if (name) {
            contextualEntries[name] = JSONEntry;
        } else {
            Object.keys(JSONEntry).forEach((key) => {
                this.addEntry(JSONEntry[key], key, dictionaryContext);
            });
        }
    }

    getContextualEntries(dictionaryContext) {
        if (dictionaryContext) {
            if (!this.entries[dictionaryContext]) {
                this.entries[dictionaryContext] = {};
            }
            return this.entries[dictionaryContext];
        } else {
            return this.entries;
        }
    }

    processEntry(entry, context) {
        let contextualEntry = this.processContexts(entry, context);
        return this.processWeights(contextualEntry);
    }

    processContexts(entry, context) {
        if (context && context.contexts) {
            let contextualEntry = [].concat(entry).filter(value => {
                return value.hasOwnProperty("context") && context.hasMatchingContext(value.context);
            });
            if (contextualEntry.length > 0) {
                return contextualEntry;
            }
        }
        return entry;
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

    getEntry(name, explicit, context) {
        if (typeof explicit === typeof undefined) explicit = true;
        let contextualEntries = context.dictionaryContext ? this.entries[context.dictionaryContext] : this.entries;

        let entry = name.split(".").reduce((currentStep, nextStep) => {
            if (currentStep === null) return null;
            let curObj = currentStep[nextStep];
            if (curObj) {
                return curObj;
            }
            else if (!explicit) {
                return currentStep;
            } else {
                return null;
            }

        }, contextualEntries);
        if (explicit && Array.isArray(entry) === false) {
            return null;
        }

        return this.processEntry(entry, context);
    }
}
