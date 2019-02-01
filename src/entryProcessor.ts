import Processor from "./processor";

export default class EntryProcessor {

    /**
     * Filter out entries that match the currently active contexts, if none do then return all
     * @param {array} entry - the entry to process
     * @param {Processor} processorInstance - the current process instance
     * @returns {array}
     */
    public static processContexts(entry: any[], processorInstance: Processor): any[] {

        // filter entries that have at least one matching context
        const contextualEntry = entry.filter((value) => {
            if (value.hasOwnProperty("context")) {
                if (value.context.hasOwnProperty("match")) {
                    return processorInstance.hasMatchingContext(value.context.match);
                }
                return processorInstance.hasMatchingContext(value.context);
            }
        });
        // only return contextual entries if any match
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
    public static processWeights(entry: any): any[] {
        if (entry !== null && Array.isArray(entry)) {
            let index;
            while ((index = entry.findIndex((value) => value.hasOwnProperty("weight"))) !== -1) {
                const weightedValues = [];
                for (let i = 0; i < entry[index].weight; i++) {
                    weightedValues.push(entry[index].value);
                }
                entry.splice(index, 1, ...weightedValues);
            }
        }
        return entry;
    }
}
