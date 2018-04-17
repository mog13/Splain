import Token from "./splainToken";
import finder from "./templateFinder";
import executor from "./templateExecutor";

const regToken = /[?`|\s]/;

export default class {

    static processTemplate(text, addQuotes, context) {
        finder.getTemplates(text, context).forEach(template => {
            let strippedTemplate = finder.stripTemplate(template, context),
                tokens = this.getTokens(strippedTemplate, context),
                compiledTemplate = executor.run(tokens, context);
            if (finder.containsTemplate(compiledTemplate, context)) compiledTemplate = this.processTemplate(compiledTemplate, false, context);
            text = text.replace(`${template}`, compiledTemplate);
            context.addTemplateResolution(strippedTemplate, compiledTemplate);
        });
        return text;
    }

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
        if (template.startsWith(context.config.templateTokens.opening)) {
            let bracketAmount = 1,
                openLength = context.config.templateTokens.opening.length,
                closeLength = context.config.templateTokens.closing.length;
            n = openLength;
            while (n < template.length && bracketAmount > 0) {
                if (template.indexOf(context.config.templateTokens.opening, n) === n) {
                    bracketAmount++;
                    n += openLength;
                }
                else if (template.indexOf(context.config.templateTokens.closing, n) === n) {
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
        let nextTemplate = template.indexOf(context.config.templateTokens.opening);
        if (nextToken == -1 || (nextTemplate > -1 && nextTemplate < nextToken)) nextToken = nextTemplate;
        if (nextToken < 0) {
            nextToken = template.length;
        }
        let tokenData = template.substring(0, nextToken);
        if (template.startsWith(context.config.variableResolutionToken)) {
            return new Token("variable", tokenData.substr(context.config.variableResolutionToken.length), tokenData);
        }
        if (template.startsWith(context.config.fixedResolutionToken)) {
            return new Token("fixed", tokenData.substr(context.config.fixedResolutionToken.length), tokenData);
        }

        return new Token("splain", tokenData, tokenData);

    }
}