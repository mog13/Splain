import processor from "./templateProcessor";
import finder from "./templateFinder";

export default class Token {

    constructor(type, data, raw) {
        this.type = type;
        this.data = data;
        this.raw = raw;
    }
    convert(context) {
        function getResult(token) {
            let entry = context.getFromCache(token);
            if (!entry) {
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
