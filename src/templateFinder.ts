import Config from "./config";
import LiteralFinder from "./literalFinder";

export default class TemplateFinder {

    /**
     * Get all the templates within the given text
     * @param text - the text to search
     * @param {Config} config - the splain config
     * @returns {Array} - the found templates
     */
    public static getTemplates(text: string, config: Config) {
        const templates = [];
        const literals = LiteralFinder.getLiterals(text);
        const openingTokens = text.split(config.templateTokens.opening).length - 1;
        const closingTokens = text.split(config.templateTokens.closing).length - 1;

        if (openingTokens > closingTokens) {
            throw new Error((`Error: not enough closing tokens found in ${text}`));
        }
        if (openingTokens < closingTokens) {
            throw new Error((`Error: not enough opening tokens found in ${text}`));
        }
        while (text.includes(config.templateTokens.opening) && text.includes(config.templateTokens.closing)) {
            const start = text.indexOf(config.templateTokens.opening);
            let nested = 0;
            // start +2 to skip  initial brackets
            for (let i = start + 2; i < text.length - 1; i++) {
                if (text[i] + text [i + 1] === config.templateTokens.opening) {
                    nested++;
                }
                if (text[i] + text [i + 1] === config.templateTokens.closing) {
                    if (nested > 0) {
                        nested--;
                        i += 1; // skip over the other nested '}'
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
     * @param {Config} config - the splain config
     * @returns {*}
     */
    public static containsTemplate(text: string, config: Config) {
        function escapeTokens(templateTokens) {
            return "\\" + templateTokens.split("").join("\\");
        }

        const regTemplateMatcher = escapeTokens(config.templateTokens.opening) + ".*?" + escapeTokens(config.templateTokens.closing);
        return text.match(regTemplateMatcher);
    }

}
