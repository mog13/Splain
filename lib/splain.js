import Dictionary from "./dictionary";
import SplainConfig from "./splainConfig";
import defaults from "./defaultDictionaries";
import processor from "./templateProcessor";
import SplainContext from "./splainContext";
import dictionaryVerifier from "../utility/dictionaryVerifier";

export default class Splain {
    constructor(initialDictionary) {
        this.dictionary = new Dictionary();
        if (initialDictionary) {
            this.dictionary.addEntry(initialDictionary);
        } else {
            this.dictionary.addEntry(defaults);
        }
        this.config = new SplainConfig();
    }

    addEntry(JSON, name, dictionaryContext) {
        this.dictionary.addEntry(JSON, name, dictionaryContext);
    }

    process(text, variables, dictionaryContext) {
        let context = new SplainContext(this.dictionary, this.config);
        if (variables) {
            context["variables"] = variables;
        }
        if (dictionaryContext) {
            context["dictionaryContext"] = dictionaryContext;
        }
        return processor.processTemplate(text, false, context);
    }

    verifyDictionary(dictionary) {
        return dictionaryVerifier.verifyEntries(dictionary);
    }

}
