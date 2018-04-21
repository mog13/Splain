import Splain from "./splain"
import finder from "./templateFinder";
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
        switch (this.type) {
        case "splain": {
            return processorInstance.getResult(this.data);
        }
        case "fixed": {
            let fixed = processorInstance.getFixedResolution(this.data);
            if (fixed) {
                return fixed;
            }
            let result = processorInstance.getResult(this.data);
            processorInstance.addFixedResolution(this.data, result);
            return result;
        }
        case "variable": {
            if (processorInstance.variables && processorInstance.variables.hasOwnProperty(this.data)) {
                let variable = processorInstance.variables[this.data];
                if (typeof variable === "function") {
                    return variable(processorInstance);
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
            return finder.containsTemplate(output,processorInstance.config) ? Splain.processTemplate(output, processorInstance) : output;
        }
        default: {
            return undefined;
        }
        }
    }

}
