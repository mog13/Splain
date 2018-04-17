import Dictionary from "./dictionary";
import SplainConfig from "./splainConfig";
import defaults from "./defaultDictionaries";
import processor from "./templateProcessor";
import SplainContext from "./splainContext";
import dictionaryVerifier from "../utility/dictionaryVerifier";

/**
 * Main Splain Class and intended interface with library.
 */
export default class Splain {
    /**
     * Create a new instance of Splain
     * @param {Object} [initialDictionary] - Optional JSON object to use as initial dictionary.
     */
    constructor(initialDictionary) {
        this.dictionary = new Dictionary();
        this.dictionary.addEntry(initialDictionary || defaults);
        this.config = new SplainConfig();
    }

    /**
     * Add an entry to a splain dictionary
     * @param {Object} JSON - The entry to add in the form of JSON (can be multiple layers deep and have multiple roots). Also accepts array when used with the name param
     * @param {string} [name] - The name of the entry if an array was given instead of JSON. this is long hand for simply using JSON {name:[entries]}
     * @param {string} [dictionaryContext] - the dictionary to add it to i.e EN
     */
    addEntry(JSON, name, dictionaryContext) {
        this.dictionary.addEntry(JSON, name, dictionaryContext);
    }

    /**
     * Process a given string compiling all the templates in it.
     * @param {string} text - the text or string to compile (that contains splain templates
     * @param {object} [variables] - any variables needed for variable templates to use
     * @param {string} [dictionaryContext] - the dictionary to use
     * @returns {string} - the compiled template
     */
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

    /**
     * verifies all entries in a dictionary compile to something
     * @param dictionary
     * @returns {*}
     */
    verifyDictionary(dictionary) {
        return dictionaryVerifier.verifyEntries(dictionary);
    }

}
