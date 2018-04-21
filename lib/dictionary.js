import EntryProcessor from "./entryProcessor";

export default class Dictionary {

    constructor() {
        this.entries = {};
    }

    /**
     * Add an entry to a splain dictionary
     * @param {Object} entry - The entry to add in the form of JSON (can be multiple layers deep and have multiple roots).
     */
    addEntry(entry) {
        Object.keys(entry).forEach((key) => {
            this.entries[key] = entry[key];
        });
    }

    /**
     * get a dictionary entry
     * @param {string} name - the entry name/path
     * @returns {*}
     */
    getEntry(name) {
        //get the entries by walking down the path with a reduce
        let entry = name.split(".").reduce((currentStep, nextStep) => {
            if (currentStep === null) return null;
            let curObj = currentStep[nextStep];
            if (curObj) {
                return curObj;
            }
            else {
                return null;
            }

        }, this.entries);
        //if the entry isn't an array then its invalid and return null
        return Array.isArray(entry) ? entry : null;
    }

    getProcessedEntry(name, processorInstance) {
        let entry = this.getEntry(name);
        let contextualEntry = EntryProcessor.processContexts(entry, processorInstance);
        return EntryProcessor.processWeights(contextualEntry);
    }


}
