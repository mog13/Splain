export default class SplainConfig {
    constructor() {
        this.keepTemplateOnUnmatched = true;
    }

    configure(key, value) {
        if(this.hasOwnProperty(key)) {
            this[key] = value;
        }
    }
}
