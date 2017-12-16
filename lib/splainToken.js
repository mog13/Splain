export default class Token {

    constructor(type, data, raw) {
        this.type = type;
        this.data = data;
        this.raw = raw;
    }

    convert(context) {
        switch (this.type) {
        case "splain": {
            let token = this.data;
            let isFixedResolution = this.data.startsWith(context.config.fixedResolutionToken);
            if (isFixedResolution) {
                token = token.substr(2);
                let fixed = context.getFixedResolution(token);
                if (fixed) {
                    return fixed;
                }
            }
            let entry = context.getFromCache(token);
            if (!entry) {
                entry = context.dictionary.getEntry(token, false, context);
                context.addToCache(token, entry);
            }
            if (entry !== null && Array.isArray(entry)) {
                let result = entry[Math.floor(Math.random() * entry.length)];
                if (isFixedResolution) {
                    context.addFixedResolution(token, result);
                }
                if (result.hasOwnProperty("context")) {
                    context.addContext(result.context);
                    return result.value;
                }
                return result;
            }
            if (context.config.keepTemplateOnUnmatched) return this.data;
            return null;
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
