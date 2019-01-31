import Token from "./token";

const regToken = /[?`|\s]/;

export default class TokenFinder {
    /**
     * Gets the tokens from a given template
     * @param {string} template - the template to convert to tokens
     * @param {Config} config - the splain config
     * @returns {Array} - an array of tokens
     */
    public static getTokens(template, config) {
        const tokens = [];
        let n = config.panicThreshold;
        while (template) {
            n--;
            const nextToken = this.findNextToken(template, config);
            tokens.push(nextToken);
            template = template.slice(nextToken.raw.length);
            if (n <= 0) {
                console.warn(`couldn't finish processing tokens after ${config.panicThreshold} panicking..`);
                break;
            }
        }

        return tokens;
    }

    /**
     * Find the first token in the given template
     * @param {string} template - the template to find the token in
     * @param {Config} config - the splain config
     * @returns {Token} - the first token in the template
     */
    public static findNextToken(template, config) {
        let n = 1;
        if (template.startsWith(config.templateTokens.opening)) {
            let bracketAmount = 1;
            const openLength = config.templateTokens.opening.length,
                closeLength = config.templateTokens.closing.length;
            n = openLength;
            while (n < template.length && bracketAmount > 0) {
                if (template.indexOf(config.templateTokens.opening, n) === n) {
                    bracketAmount++;
                    n += openLength;
                } else if (template.indexOf(config.templateTokens.closing, n) === n) {
                    bracketAmount--;
                    n += closeLength;
                } else {
                    n++;
                }
            }
            if (bracketAmount > 0) {
                throw new Error(`template {${template}} has no closing token`);
            }
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
        const nextTemplate = template.indexOf(config.templateTokens.opening);
        if (nextToken === -1 || (nextTemplate > -1 && nextTemplate < nextToken)) {
            nextToken = nextTemplate;
        }
        if (nextToken < 0) {
            nextToken = template.length;
        }
        const tokenData = template.substring(0, nextToken);
        if (template.startsWith(config.variableResolutionToken)) {
            return new Token("variable", tokenData.substr(config.variableResolutionToken.length), tokenData);
        }
        if (template.startsWith(config.fixedResolutionToken)) {
            return new Token("fixed", tokenData.substr(config.fixedResolutionToken.length), tokenData);
        }

        return new Token("splain", tokenData, tokenData);

    }

    /**
     * Find the first token of the given type within the provided array of tokens
     * @param {string} type - the type of token to find
     * @param {array} tokens - the tokens to use in the search
     * @returns {*}
     */
    public static findFirstTokenOfType(type, tokens) {
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === type) {
                return i;
            }
        }
        return null;
    }

    /**
     * Find the nearest preceding token of a given set of types from a given point
     * @param {array} types - the types of token to match on
     * @param {array} tokens - the tokens to use in the search
     * @param {int} index - the index to start the search from
     * @returns {*}
     */
    public static getPrecedingTokenOfType(types, tokens, index) {
        if (index === 0) {
            return null;
        }
        for (let i = index - 1; i >= 0; i--) {
            if (types.indexOf(tokens[i].type) > -1) {
                return i;
            }
        }
        return null;
    }

    /**
     * Find the nearest preceding token of a given set of types from a given point
     * @param {array} types - the types of token to match on
     * @param {array} tokens - the tokens to use in the search
     * @param {int} index - the index to start the search from
     * @returns {*}
     */
    public static getProceedingTokenOfType(types, tokens, index) {
        if (index === tokens.length - 1) {
            return null;
        }
        for (let i = index + 1; i < tokens.length; i++) {
            if (types.indexOf(tokens[i].type) > -1) {
                return i;
            }
        }
        return null;
    }
}
