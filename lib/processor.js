import Dictionary from "./dictionary";
import Config from "./config";

export default class {
    /**
     * Create a new splainContext
     * @param {object} dictionary - the dictionary to use
     * @param {object} config - the config to use
     */
    constructor(dictionary, config, options) {
        this.dictionary = dictionary || new Dictionary();
        this.config = config ||new Config();
        this.contexts = [];
        this.templateResolutions = {};
        this.fixedResolutions = {};
        this.dictionaryCache = {};
        //Add the contents of options to this. Allows for overrides like supplying initial contexts by including them in options
        if(options) Object.assign(this,options);
    }

    /**
     * Add the found entry to the cache against the token/path so it doesn't need to be looked up if reused.
     * @param {string} token - the token
     * @param {array} entry - the entry
     */
    addToCache(token, entry) {
        this.dictionaryCache[token] = entry;
    }

    /**
     * return the cached toke if it exists
     * @param {string} token - the token
     * @returns {array}
     */
    getFromCache(token) {
        if (this.dictionaryCache) {
            return this.dictionaryCache[token];
        }
    }

    /**
     * Adds result to the fixed resolutions object
     * @param {string} token - the token to be mapped by
     * @param {string} result - the compiled output of the token
     */
    addFixedResolution(token, result) {
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
        if (!this.hasMatchingContext(context)) {
            this.contexts = this.contexts.concat(context);
        }

        this.contexts = this.contexts.filter((context, pos) => this.contexts.indexOf(context) === pos);
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
        if(!this.templateResolutions[template]) this.templateResolutions[template] = [resolution];
        else this.templateResolutions[template] = this.templateResolutions[template].concat(resolution);
    }



}