export default class SplainConfig {
    constructor() {
        this.keepTemplateOnUnmatched = true;
        this.templateTokens = {
            opening: "{{",
            closing: "}}"
        };
        this.fixedResolutionToken = "::";
        this.variableResolutionToken = "##";
        this.explicit = false;
        this.keepTemplateOnUnmatched = true;
    }

    /**
     * Sets a config parameter
     * @param {string} key - the parameter to configure
     * @param value - the value to set the parameter to
     * @returns {SplainConfig}
     */
    configure(key, value) {
        if(this.hasOwnProperty(key)) {
            this[key] = value;
        }
        return this;
    }
}
