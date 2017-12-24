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
                entry = context.dictionary.getEntry(token, false, context);
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
            let token = this.data.substr(context.config.fixedResolutionToken.length);
            let fixed = context.getFixedResolution(token);
            if (fixed) {
                return fixed;
            }
            let result = getResult(token);
            context.addFixedResolution(token, result);
            return result;
        }
        case "variable": {
            let token = this.data.substr(context.config.variableResolutionToken.length);
            if (context.hasOwnProperty("variables") && context.variables.hasOwnProperty(token)) {
                let variable = context.variables[token];
                if (typeof variable === "function") {
                    return variable();
                } else {
                    return variable;
                }
            }
            return context.config.keepTemplateOnUnmatched ? token : null;
        }
        case "blank": {
            return " ";
        }
        case "lit": {
            return this.data;
        }
        default: {
            return undefined;
        }
        }
    }

}
