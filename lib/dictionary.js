export default class Dictionary {

    constructor() {
        this.entries = {};
    }

    /**
     * Add an entry to a splain dictionary
     * @param {Object} JSONEntry - The entry to add in the form of JSON (can be multiple layers deep and have multiple roots).
  */
    addEntry(JSONEntry) {
            Object.keys(JSONEntry).forEach((key) => {
                this.entries[key] = JSONEntry[key];
            });
    }

    /**
     * get a dictionary entry
     * @param {string} name - the entry name/path
     * @param instance - the current context of splain to process it in
     * @returns {*}
     */
    getEntry(name, instance) {
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
        //if the entry isnt an array then its invalid
        if (Array.isArray(entry) === false) {
            return null;
        }

        //apply weights and context filtering to the entries
        let contextualEntry = this.processContexts(entry, instance);
        return this.processWeights(contextualEntry);
    }




}
