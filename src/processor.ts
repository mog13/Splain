import Config from "./config";
import Dictionary from "./dictionary";
import Token from "./token";

export default class Processor {
    public variables: any;
    public config: Config;
    private dictionary: Dictionary;
    private contexts: any[];
    private readonly templateResolutions: {};
    private readonly fixedResolutions: {};
    /**
     * Create a new splainContext
     * @param {object} [dictionary] - the dictionary to use
     * @param {object} [config] - the config to use
     * @param [options]
     */
    constructor(dictionary?: Dictionary, config?: Config, options?: any) {
        this.dictionary = dictionary || new Dictionary();
        this.config = config || new Config();
        this.contexts = [];
        this.templateResolutions = {};
        this.fixedResolutions = {};
        // Add the contents of options to this. Allows for overrides like supplying initial contexts by including them in options
        if (options) { Object.assign(this, options); }
    }

    /**
     * Gets a an entry given a path
     * @param path - the path to the required entries
     * @returns {*}
     */
    public getResult(path: string): any {
        const entry = this.dictionary.getProcessedEntry(path, this);
        if (entry !== null && Array.isArray(entry)) {
            const result = entry[Math.floor(Math.random() * entry.length)];
            if (result.hasOwnProperty("context")) {
                if (result.context.hasOwnProperty("match")) {
                    if (result.context.hasOwnProperty("add")) { this.addContext(result.context.add); }
                    // follow normal policy with matcher array
                    result.context = result.context.match;
                }
                this.addContextWithPolicy(result.context);
                return result.value;
            }
            return result;
        }
        return this.config.keepTemplateOnUnmatched ? path : null;
    }

    /**
     * Adds result to the fixed resolutions object
     * @param {string} tokenContent - the token to be mapped by
     * @param {string} result - the compiled output of the token
     */
    public addFixedResolution(tokenContent: string, result: string): void {
        this.fixedResolutions[tokenContent] = result;
    }

    /**
     * retrieves sny matching fixed resolutions
     * @param {string} tokenContent - the token to search for
     * @returns {*}
     */
    public getFixedResolution(tokenContent: string): any {
        return this.fixedResolutions[tokenContent];

    }

    /**
     * Adds an entry context with respect to the current context matching policy
     * @param {array} context - the contexts to add
     */
    public addContextWithPolicy(context: any[]): void {
        context = [].concat(context);
        if (this.config.contextMatcher !== this.config.contextMatchers.conservative && !this.hasMatchingContext(context)) {
            // if it doesn't already have one of the contexts
            if (this.config.contextMatcher === this.config.contextMatchers.selective) {
                context = context[Math.floor(Math.random() * context.length)];
            }

            this.addContext(context);
        }
    }

    /**
     * add all contexts given irregardless of policy
     * @param ctx
     */
    public addContext(ctx: any[]) {
        this.contexts = this.contexts.concat(ctx);

        this.contexts = this.contexts.filter((context, pos) => this.contexts.indexOf(context) === pos);
    }

    /**
     * returns if the given contexts match any current contexts
     * @param {array} context - the context to check.
     * @returns {boolean}
     */
    public hasMatchingContext(context: any[]) {
        return (Array.isArray(context) && this.contexts.some((con) => context.includes(con)) || this.contexts.includes(context));
    }

    /**
     * Add a compiled resolution to the splain context
     * @param {string} template - the template that was compiled
     * @param {string} resolution - the output of the template
     */
    public addTemplateResolution(template: string, resolution: string) {
        if (!this.templateResolutions[template]) { this.templateResolutions[template] = [resolution]; } else { this.templateResolutions[template] = this.templateResolutions[template].concat(resolution); }
    }

}
