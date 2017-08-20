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

    process(text){
        let templates = finder.getTemplates(text);
        templates.forEach(template=>{
            template = finder.stripTemplate(template);
            if(finder.containsTemplate(template)) {
                template = this.process(template);
            }
            let compiledTemplate = executor.run(processor.getTokens(template), this.dictionary);
            text = text.replace(`{{${template}}}`,compiledTemplate);
        });

        if(finder.containsTemplate(text)) this.process(text);
        return text;
    }

}