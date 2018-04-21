import LiteralFinder from "./literalFinder";

export default class {

    /**
     * Get all the templates within the given text
     * @param text - the text to search
     * @param context - the splain contexts
     * @returns {Array} - the found templates
     */
    static getTemplates(text, config) {
        let templates = [];
        let literals = LiteralFinder.getLiterals(text);
        let openingTokens = text.split(config.templateTokens.opening).length - 1;
        let closingTokens = text.split(config.templateTokens.closing).length - 1;

        if (openingTokens > closingTokens) throw(`Error: not enough closing tokens found in ${text}`);
        if (openingTokens < closingTokens) throw(`Error: not enough opening tokens found in ${text}`);
        while (text.includes(config.templateTokens.opening) && text.includes(config.templateTokens.closing)) {
            let start = text.indexOf(config.templateTokens.opening),
                nested = 0;
            //start +2 to skip  initial brackets
            for (let i = start + 2; i < text.length - 1; i++) {
                if (text[i] + text [i + 1] === config.templateTokens.opening) {
                    nested++;
                }
                if (text[i] + text [i + 1] === config.templateTokens.closing) {
                    if (nested > 0) {
                        nested--;
                        i += 1; //skip over the other nested '}'
                    } else {
                        if (!LiteralFinder.withinLiterals(start, i + 1, literals)) {
                            templates.push(text.substring(start, i + 2));
                        }
                        text = text.slice(0, start) + text.slice(i + 2);
                        i = text.length;
                    }
                }
            }
        }
        return templates;
    }


    /**
     * returns if the given text contains a template
     * @param {string} text - the text to check
     * @param context - the current splain Context.
     * @returns {*}
     */
    static containsTemplate(text, config) {
        function escapeTokens(templateTokens) {
            return "\\" + templateTokens.split("").join("\\");
        }

        let regTemplateMatcher = escapeTokens(config.templateTokens.opening) + ".*?" + escapeTokens(config.templateTokens.closing);
        return text.match(regTemplateMatcher);
    }

}


