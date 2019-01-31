export default class Config {
    public keepTemplateOnUnmatched: boolean;
    public contextMatchers: { conservative: number; selective: number; additive: number };
    public contextMatcher: number;
    private templateTokens: { opening: string; closing: string };
    private fixedResolutionToken: string;
    private variableResolutionToken: string;
    private panicThreshold: number;

    constructor() {
        this.keepTemplateOnUnmatched = true;
        this.templateTokens = {
            opening: "{{",
            closing: "}}",
        };
        this.fixedResolutionToken = "::";
        this.variableResolutionToken = "##";
        this.keepTemplateOnUnmatched = true;
        this.panicThreshold = 100000;
        this.contextMatchers = {conservative: 0, selective: 1, additive: 2};
        this.contextMatcher = this.contextMatchers.selective;
    }

    /**
     * Sets a config parameter
     * @param {string} key - the parameter to configure
     * @param value - the value to set the parameter to
     * @returns {Config}
     */
    public configure(key: string, value: any) {
        if (this.hasOwnProperty(key)) {
            this[key] = value;
        }
        return this;
    }
}
