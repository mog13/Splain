import Dictionary from "./dictionary";
import defaults from "./defaultDictionaries";
import finder from "./templateFinder";
import processor from "./templateProcessor";
import executor from "./templateExecutor";
export default class Splain {
    constructor() {
        this.dictionary = new Dictionary();
        this.dictionary.addEntry(defaults);
    }

    addEntry(JSON, name){
        this.dictionary.addEntry(JSON, name);
    }

    process(text, addQuotes){
        let templates = finder.getTemplates(text);
        templates.forEach(template=>{
            template = finder.stripTemplate(template);
            if(finder.containsTemplate(template)) {
                let output = `${this.process(template,true)}`;
                text = text.replace(template,output);
                template= `${output}`;
            }
            let compiledTemplate = executor.run(processor.getTokens(template), this.dictionary);
            if(addQuotes) compiledTemplate = `\`${compiledTemplate}\``;
            text = text.replace(`{{${template}}}`,compiledTemplate);
        });

        if(finder.containsTemplate(text) !== null) text = this.process(text);
        return text;
    }

}