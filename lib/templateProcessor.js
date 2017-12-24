import Token from "./splainToken";

const regToken = /[?`|\s]/;

export default class {

    static getTokens(template, context) {
        let tokens = [];
        let n = 100000;
        while (template) {
            n--;
            let nextToken = this.findNextToken(template, context);
            tokens.push(nextToken);
            template = template.slice(nextToken.raw.length);
            if (n < 0) {
                console.warn("couldn't finish processing tokens after 100,000 panicking..");
                break;
            }
        }

        return tokens;
    }


    static findNextToken(template, context) {
        let n = 1;
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
        if (nextToken < 0) {
            nextToken = template.length;
        }
        if (template.startsWith(context.config.variableResolutionToken)) {
            let tokenData = template.substring(0, nextToken);
            return new Token("variable", tokenData, tokenData);
        }
        if (template.startsWith(context.config.fixedResolutionToken)) {
            let tokenData = template.substring(0, nextToken);
            return new Token("fixed", tokenData, tokenData);
        }
        let tokenData = template.substring(0, nextToken);
        return new Token("splain", tokenData, tokenData);

    }
}