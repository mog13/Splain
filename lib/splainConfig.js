export default class SplainConfig {
  constructor() {
    this.keepTemplateOnUnmatched = true;
    this.templateTokens = {
      opening: "{{",
      closing: "}}"
    }
  }

  configure(key, value) {
    if(this.hasOwnProperty(key)) {
      this[key] = value;
    }
    return this;
  }
}
