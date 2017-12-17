export default class SplainContext {
    constructor(dictionary, config) {
        this.dictionary = dictionary;
        this.config = config;
    }

    addToCache(token, entry) {
        if (!this.dictionaryCache) {
            this.dictionaryCache = {};
        }
        this.dictionaryCache[token] = entry;
    }

    getFromCache(token) {
        if(this.dictionaryCache) {
            return this.dictionaryCache[token];
        }
    }

    addFixedResolution(token, result) {
        if (!this.fixedResolutions) {
            this.fixedResolutions = {};
        }
        this.fixedResolutions[token] = result;
    }

    getFixedResolution(token) {
        if (this.fixedResolutions) {
            return this.fixedResolutions[token];
        }
    }

    addContext(context) {
        if(!this.contexts) {
            this.contexts = [];
        }
        this.contexts.push(context);
    }

}