export default class {

    static getLiterals(text) {
        let literals = [];
        let last = null;
        for(let i =0; i < text.length; i++){
            if(text[i] === "`") {
                if(last === null) {
                    last = i;
                }
                else{
                    literals.push({start:last,end:i});
                    last = null;
                }
            }
        }
        return literals;
    }

    static withinLiterals(start,end,literals) {
        let within = false;
        literals.forEach((literal) => {
            //should break
            if(literal.start < start && literal.end > end) within =  true;
        });
        return within;
    }

    static getTemplates(text, context) {
        let templates = [];
        let literals = this.getLiterals(text);

        while (text.includes(context.config.templateTokens.opening) && text.includes(context.config.templateTokens.closing)) {
            let start = text.indexOf(context.config.templateTokens.opening),
                nested = 0;
            //start +2 to skip  initial brackets
            for (let i = start +2; i < text.length - 1; i++) {
                if (text[i] + text [i + 1] === context.config.templateTokens.opening) {
                    nested++;
                }
                if (text[i] + text [i + 1] === context.config.templateTokens.closing) {
                    if (nested > 0) {
                        nested--;
                        i+=1; //skip over the other nested '}'
                    } else {
                        if(!this.withinLiterals(start,i+1, literals))
                        {
                            templates.push(text.substring(start, i + 2));
                        }
                        text = text.slice(0,start) + text.slice(i+2);
                        i = text.length;
                    }
                }
            }
        }
        return templates;
    }

    static stripTemplate(template, context) {
        let open = template.indexOf(context.config.templateTokens.opening),
            close = template.lastIndexOf(context.config.templateTokens.closing)-2;
        if(open > -1) template = template.slice(0,open) + template.slice(open +2);
        if(close > -1) template = template.slice(0,close) + template.slice(close +2);
        return template;
    }

    static containsTemplate(text, context) {
        function escapeTokens(templateTokens) {
            return "\\" + templateTokens.split("").join("\\");
        }
        let regTemplateMatcher = escapeTokens(context.config.templateTokens.opening) + ".*?" + escapeTokens(context.config.templateTokens.closing);
        return text.match(regTemplateMatcher);
    }

}


