import Splain from "./splain"
import finder from "./templateFinder";
import EntryProcessor from "./entryProcessor";
export default class Token {

    /**
     * Create a new splain oken
     * @param {string} type - the type of token it is (splain/fixed/variable/blank/lit/template)
     * @param data - the relevant data about the token, different depending on type
     * @param {string} raw - the raw token as it appeared in the original template
     */
    constructor(type, data, raw) {
        this.type = type;
        this.data = data;
        this.raw = raw;
    }

    /**
     * Converts the given token iintos its compiled equivalent.
     * @param {object} processorInstance - the splain context to use
     * @returns {*}
     */
    convert(processorInstance) {
        function getResult(token) {
            // check if we've cached the entries
            let entry = processorInstance.getFromCache(token);
            if (!entry) {
                //if we haven't find the entry and cache is
                entry = processorInstance.dictionary.getProcessedEntry(token, processorInstance);
                processorInstance.addToCache(token, entry);
            }
            if (entry !== null && Array.isArray(entry)) {
                let result = entry[Math.floor(Math.random() * entry.length)];
                if (result.hasOwnProperty("context")) {
                    processorInstance.addContext(result.context);
                    return result.value;
                }
                return result;
            }
            return processorInstance.config.keepTemplateOnUnmatched ? token : null;
        }

        switch (this.type) {
        case "splain": {
            return getResult(this.data);
        }
        case "fixed": {
            let fixed = processorInstance.getFixedResolution(this.data);
            if (fixed) {
                return fixed;
            }
            let result = getResult(this.data);
            processorInstance.addFixedResolution(this.data, result);
            return result;
        }
        case "variable": {
            if (processorInstance.hasOwnProperty("variables") && processorInstance.variables.hasOwnProperty(this.data)) {
                let variable = processorInstance.variables[this.data];
                if (typeof variable === "function") {
                    return variable(processorInstance.templateResolutions);
                } else {
                    return variable;
                }
            }
            return processorInstance.config.keepTemplateOnUnmatched ? this.data : null;
        }
        case "blank": {
            return " ";
        }
        case "lit": {
            return this.data;
        }
        case "template": {
            let output = Splain.processTemplate(this.raw, processorInstance);
            return finder.containsTemplate(output,processorInstance) ? Splain.processTemplate(output, processorInstance) : output;
        }
        default: {
            return undefined;
        }
        }
    }

}
