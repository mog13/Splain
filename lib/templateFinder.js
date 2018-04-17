export default class {

    /**
     * returns any literals in a given string
     * @param {string} text - the text to search
     * @returns {Array}
     */
    static getLiterals(text) {
        let literals = [];
        let last = null;
        for (let i = 0; i < text.length; i++) {
            if (text[i] === "`") {
                if (last === null) {
                    last = i;
                }
                else {
                    literals.push({start: last, end: i});
                    last = null;
                }
            }
        }
        return literals;
    }

    /**
     * returns if the given start and end index's fall within the given array
     * @param {int} start - the start of the index to check
     * @param {int} end - the end of the index to check
     * @param {array} literals - the array of literals (starts and ends) to check against
     * @returns {boolean}
     */
    static withinLiterals(start, end, literals) {
        let within = false;
        literals.forEach((literal) => {
            //should break
            if (literal.start < start && literal.end > end) within = true;
        });
        return within;
    }

    /**
     * Get all the templates within the given text
     * @param text - the text to search
     * @param context - the splain contexts
     * @returns {Array} - the found templates
     */
    static getTemplates(text, context) {
        let templates = [];
        let literals = this.getLiterals(text);
        let openingTokens = text.split(context.config.templateTokens.opening).length - 1;
        let closingTokens = text.split(context.config.templateTokens.closing).length - 1;

        if (openingTokens > closingTokens) throw(`Error: not enough closing tokens found in ${text}`);
        if (openingTokens < closingTokens) throw(`Error: not enough opening tokens found in ${text}`);
        while (text.includes(context.config.templateTokens.opening) && text.includes(context.config.templateTokens.closing)) {
            let start = text.indexOf(context.config.templateTokens.opening),
                nested = 0;
            //start +2 to skip  initial brackets
            for (let i = start + 2; i < text.length - 1; i++) {
                if (text[i] + text [i + 1] === context.config.templateTokens.opening) {
                    nested++;
                }
                if (text[i] + text [i + 1] === context.config.templateTokens.closing) {
                    if (nested > 0) {
                        nested--;
                        i += 1; //skip over the other nested '}'
                    } else {
                        if (!this.withinLiterals(start, i + 1, literals)) {
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
     * strips the template deliminators, leaves inner templates remaining
     * @param {string} template - the template to strip
     * @param context - the current splain context
     * @returns {*}
     */
    static stripTemplate(template, context) {
        let open = template.indexOf(context.config.templateTokens.opening),
            close = template.lastIndexOf(context.config.templateTokens.closing) - context.config.templateTokens.closing.length;
        if (open > -1) template = template.slice(0, open) + template.slice(open + context.config.templateTokens.opening.length);
        if (close > -1) template = template.slice(0, close) + template.slice(close + context.config.templateTokens.opening.length);
        return template;
    }

    /**
     * returns if the given text contains a template
     * @param {string} text - the text to check
     * @param context - the current splain Context.
     * @returns {*}
     */
    static containsTemplate(text, context) {
        function escapeTokens(templateTokens) {
            return "\\" + templateTokens.split("").join("\\");
        }

        let regTemplateMatcher = escapeTokens(context.config.templateTokens.opening) + ".*?" + escapeTokens(context.config.templateTokens.closing);
        return text.match(regTemplateMatcher);
    }

}


