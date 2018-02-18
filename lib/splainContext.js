import SplainConfig from "./splainConfig";
import Dictionary from "./dictionary";

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

    addTemplateResolution(template, resolution) {
        if(!this.templateResolutions) {
            this.templateResolutions = {};
        }
        if (!this.templateResolutions[template]) {
            this.templateResolutions[template] = resolution;
        } else if (Array.isArray(this.templateResolutions[template])) {
            this.templateResolutions[template].push(resolution);
        } else {
            let firstResolution = this.templateResolutions[template];
            this.templateResolutions[template] = [];
            this.templateResolutions[template].push(firstResolution);
            this.templateResolutions[template].push(resolution);
        }
    }

    static getDefault() {
        return new SplainContext(new Dictionary(), new SplainConfig());
    }

}