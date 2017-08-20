import Dictionary from "./dictionary";
import defaults from "./defaultDictionaries";
import processor from "./templateFinder";
export default class Splain {
    constructor() {
        this.dictionary = new Dictionary();
        this.dictionary.addEntry(defaults);
    }

    process(text){
        let templates = processor.getTemplates(text);
        templates.forEach(template=>{
            template = processor.stripTemplate(template);
            if(processor.containsTemplate(template)) {
                template = this.process(template);
            }
            //run templates
        })
    }

}