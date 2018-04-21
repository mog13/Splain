export default class EntryProcessor {

    /**
     * Filter out entries that match the currently active contexts, if none do then return all
     * @param {array} entry - the entry to process
     * @param {Processor} processorInstance - the current process instance
     * @returns {array}
     */
    static processContexts(entry, processorInstance) {

        //filter entries that have at least one matching context
        let contextualEntry = entry.filter(value => {
            return value.hasOwnProperty("context") && processorInstance.hasMatchingContext(value.context);
        });
        //only return contextual entries if any match
        if (contextualEntry.length > 0) {
            return contextualEntry;
        }

        return entry;
    }

    /**
     * Temporarily add extra entries to account for a heavier weighting
     * @param {array} entry - the entry to process
     * @returns {array}
     */
    static processWeights(entry) {
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
}