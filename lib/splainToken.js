export default class Token {

    constructor(type, data, raw) {
        this.type = type;
        this.data = data;
        this.raw = raw;
    }

    convert(dictionary, config) {
        switch (this.type) {
        case "splain": {
            let entry = dictionary.getEntry(this.data, false);
            if (entry !== null && Array.isArray(entry)) {
                let weightedEntries = dictionary.processWeights(entry);
                return weightedEntries[Math.floor(Math.random() * weightedEntries.length)];
            }
            if (config.keepTemplateOnUnmatched) return this.data;
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
