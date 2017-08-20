import Dictionary from "./dictionary";
import defaults from "./defaultDictionaries";
export default class Splain {
    constructor() {
        this.dictionary = new Dictionary();
        this.dictionary.addEntry(defaults);
    }

}