import processor from "./templateProcessor";
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
     * @param {object} context - the splain context to use
     * @returns {*}
     */
    convert(context) {
        function getResult(token) {
            // check if weve cached the entries
            let entry = context.getFromCache(token);
            if (!entry) {
                //if we havn't find the entry and cache is
                entry = context.dictionary.getEntry(token, context.config.explicit, context);
                context.addToCache(token, entry);
            }
            if (entry !== null && Array.isArray(entry)) {
                let result = entry[Math.floor(Math.random() * entry.length)];
                if (result.hasOwnProperty("context")) {
                    context.addContext(result.context);
                    return result.value;
                }
                return result;
            }
            return context.config.keepTemplateOnUnmatched ? token : null;
        }

        switch (this.type) {
        case "splain": {
            return getResult(this.data);
        }
        case "fixed": {
            let fixed = context.getFixedResolution(this.data);
            if (fixed) {
                return fixed;
            }
            let result = getResult(this.data);
            context.addFixedResolution(this.data, result);
            return result;
        }
        case "variable": {
            if (context.hasOwnProperty("variables") && context.variables.hasOwnProperty(this.data)) {
                let variable = context.variables[this.data];
                if (typeof variable === "function") {
                    return variable(context.templateResolutions);
                } else {
                    return variable;
                }
            }
            return context.config.keepTemplateOnUnmatched ? this.data : null;
        }
        case "blank": {
            return " ";
        }
        case "lit": {
            return this.data;
        }
        case "template": {
            let output = processor.processTemplate(this.raw, false, context);
            return finder.containsTemplate(output,context) ? processor.processTemplate(output, false, context) : output;
        }
        default: {
            return undefined;
        }
        }
    }

}
