import Token from "./token";

const regToken = /[?`|\s]/;

export default class {
    /**
     * gets the tokens from a given template
     * @param {string} template - the template to convert to tokens
     * @param config - the current splain context
     * @returns {Array} - an array of tokens
     */
    static getTokens(template, config) {
        let tokens = [];
        let n = config.panicThreshold;
        while (template) {
            n--;
            let nextToken = this.findNextToken(template, config);
            tokens.push(nextToken);
            template = template.slice(nextToken.raw.length);
            if (n < 0) {
                console.warn(`couldn't finish processing tokens after ${config.panicThreshold} panicking..`);
                break;
            }
        }

        return tokens;
    }

    /**
     * Find the first token in the given template
     * @param {string} template - the template to find the token in
     * @param config
     * @returns {Token} - the first token in the template
     */
    static findNextToken(template, config) {
        let n = 1;
        if (template.startsWith(config.templateTokens.opening)) {
            let bracketAmount = 1,
                openLength = config.templateTokens.opening.length,
                closeLength = config.templateTokens.closing.length;
            n = openLength;
            while (n < template.length && bracketAmount > 0) {
                if (template.indexOf(config.templateTokens.opening, n) === n) {
                    bracketAmount++;
                    n += openLength;
                }
                else if (template.indexOf(config.templateTokens.closing, n) === n) {
                    bracketAmount--;
                    n += closeLength;
                }
                else {
                    n++;
                }
            }
            if (n < 0) throw `template {${template}} has no closing token`;
            return new Token("template", template.substring(openLength, n - closeLength), template.substring(0, n));
        }
        if (template[0] === "?") {
            while (!isNaN(template[n]) && template[n] !== " " && n < template.length) {
                n++;
            }
            return new Token("?", template.substring(1, n) || "2", template.substring(0, n));
        }
        if (template[0] === "|") {
            return new Token("|", null, "|");
        }
        if (template[0] === " " || template[0] === "\n") {
            return new Token("blank", null, template[0]);
        }
        if (template[0] === "`") {
            while (template[n] !== "`" && n < template.length) {
                n++;
            }
            return new Token("lit", template.substring(1, n), template.substring(0, n + 1));
        }
        let nextToken = template.search(regToken);
        let nextTemplate = template.indexOf(config.templateTokens.opening);
        if (nextToken === -1 || (nextTemplate > -1 && nextTemplate < nextToken)) nextToken = nextTemplate;
        if (nextToken < 0) {
            nextToken = template.length;
        }
        let tokenData = template.substring(0, nextToken);
        if (template.startsWith(config.variableResolutionToken)) {
            return new Token("variable", tokenData.substr(config.variableResolutionToken.length), tokenData);
        }
        if (template.startsWith(config.fixedResolutionToken)) {
            return new Token("fixed", tokenData.substr(config.fixedResolutionToken.length), tokenData);
        }

        return new Token("splain", tokenData, tokenData);

    }
}