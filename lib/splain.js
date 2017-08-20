import Dictionary from "./dictionary";
import defaults from "./defaultDictionaries";
export default class Splain {
    constructor() {
        this.dictionary = new Dictionary();
        this.dictionary.addEntry(defaults);
    }

    process(text){
        //get templates
        //strip templates
            //if any templates have templates then template = process template
        //run templates
    }

}