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
        this.dictionaries = {default:new Dictionary()};
        this.dictionaries.default.addEntry(initialDictionary || defaults);
        this.config = new SplainConfig();
    }

    /**
     * Add an entry to a splain dictionary
     * @param {Object} entry - The entry to add in the form of JSON (can be multiple layers deep and have multiple roots). Also accepts array when used with the name param
     * @param {string} [dictionaryName] - The name of the entry if an array was given instead of JSON. this is long hand for simply using JSON {name:[entries]}
     */
    addEntry(entry, dictionaryName) {
        if(!dictionaryName) dictionaryName = "default";
        if(!this.dictionaries[dictionaryName]) this.dictionaries[dictionaryName] = new Dictionary();
        this.dictionaries[dictionaryName].addEntry(entry);
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
        context["variables"] = variables;
        context["dictionaryContext"] = dictionaryContext;

        return processor.processTemplate(text, context);
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
