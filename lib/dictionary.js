export default class Dictionary {

    constructor() {
        this.entries = {};
    }

    /**
     * Add an entry to a splain dictionary
     * @param {Object} JSONEntry - The entry to add in the form of JSON (can be multiple layers deep and have multiple roots). Also accepts array when used with the name param
     * @param {string} [name] - The name of the entry if an array was given instead of JSON. this is long hand for simply using JSON {name:[entries]}
     * @param {string} [dictionaryContext] - the dictionary to add it to i.e EN
     */
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

    /**
     * returns the entries for a given dictionary
     * @param dictionaryContext
     * @returns {array}
     */
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

    /**
     * processes a given entry in accordance with any weighting or context it has
     * @param {array} entry - the entry to process
     * @param context - the current context of splain to process it in
     */
    processEntry(entry, context) {
        let contextualEntry = this.processContexts(entry, context);
        return this.processWeights(contextualEntry);
    }

    /**
     * filter out entries that match the currently active contexts, if none do then return all
     * @param {array} entry - the entry to process
     * @param context - the current context of splain to process it in
     * @returns {*}
     */
    processContexts(entry, context) {
        if (context && context.contexts) {
            let contextualEntry = entry.filter(value => {
                return value.hasOwnProperty("context") && context.hasMatchingContext(value.context);
            });
            if (contextualEntry.length > 0) {
                return contextualEntry;
            }
        }
        return entry;
    }

    /**
     * Temporarily add extra entries to account for a heavier weighting
     * @param {array} entry - the entry to process
     * @returns {*}
     */
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

    /**
     *
     * @param {string} name - the entry name/path
     * @param {boolean} explicit - whether to return null if no entry matched
     * @param context - the current context of splain to process it in
     * @returns {*}
     */
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
        if (Array.isArray(entry) === false) {
            return explicit? null : name;
        }

        return this.processEntry(entry, context);
    }
}
