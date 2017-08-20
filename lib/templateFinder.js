
const regTemplateMatcher = /{{.*?}}/g;

export default class {

    static getTemplates(text) {
        let templates = [];
        while (text.includes("{{") && text.includes("}}")) {
            let start = text.indexOf("{{"),
                nested = 0;
            //start +2 to skip  initial brackets
            for (let i = start +2; i < text.length - 1; i++) {
                if (text[i] + text [i + 1] === "{{") {
                    nested++;
                }
                if (text[i] + text [i + 1] === "}}") {
                    if (nested > 0) {
                        nested--;
                        i+=1; //skip over the other nested '}'
                    } else {
                        templates.push(text.substring(start,i+2));
                        text = text.slice(0,start) + text.slice(i+2);
                        i = text.length;
                    }
                }
            }
        }
        return templates;
    }

    static stripTemplate(template) {
       let open = template.indexOf("{{"),
           close = template.lastIndexOf("}}")-2;
       if(open > -1) template = template.slice(0,open) + template.slice(open +2);
       if(close > -1) template = template.slice(0,close) + template.slice(close +2);
        return template;
    }

    static containsTemplate(text) {
        return text.match(regTemplateMatcher);
    }

}


