import SplainConfig from "./splainConfig";
import Dictionary from "./dictionary";

export default class SplainContext {
    /**
     * Create a new splainContext
     * @param {object} dictionary - the dictionary to use
     * @param {object} config - the config to use
     */
    constructor(dictionary, config) {
        this.dictionary = dictionary;
        this.config = config;
        this.contexts = [];
    }

    /**
     * Add the found entry to the cache against the token/path so it doesn't need to be looked up if reused.
     * @param {string} token - the token
     * @param {array} entry - the entry
     */
    addToCache(token, entry) {
        if (!this.dictionaryCache) {
            this.dictionaryCache = {};
        }
        this.dictionaryCache[token] = entry;
    }

    /**
     * return the cached toke if it exists
     * @param {string} token - the token
     * @returns {array}
     */
    getFromCache(token) {
        if(this.dictionaryCache) {
            return this.dictionaryCache[token];
        }
    }

    /**
     * Adds result to the fixed resolutions object
     * @param {string} token - the token to be mapped by
     * @param {string} result - the compiled output of the token
     */
    addFixedResolution(token, result) {
        if (!this.fixedResolutions) {
            this.fixedResolutions = {};
        }
        this.fixedResolutions[token] = result;
    }

    /**
     * retrieves sny matching fixed resolutions
     * @param {string} token - the token to search for
     * @returns {*}
     */
    getFixedResolution(token) {
        if (this.fixedResolutions) {
            return this.fixedResolutions[token];
        }
    }

    /**
     * Adds an entry context
     * @param {array} context - the contexts to add
     */
    addContext(context) {
        if(!this.hasMatchingContext(context)) {
            this.contexts = this.contexts.concat(context);
        }

        this.contexts = this.contexts.filter((context,pos)=> this.contexts.indexOf(context) ===pos);
    }

    /**
     * returns if the given contexts match any current contexts
     * @param {array} context - the context to check.
     * @returns {boolean}
     */
    hasMatchingContext(context) {
        return (Array.isArray(context) && this.contexts.some(con => context.includes(con)) || this.contexts.includes(context));
    }

    /**
     * Add a compiled resolution to the splain context
     * @param {string} template - the template that was compiled
     * @param {string} resolution - the output of the template
     */
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

    /**
     * get a default context
     * @returns {SplainContext}
     */
    static getDefault() {
        return new SplainContext(new Dictionary(), new SplainConfig());
    }

}