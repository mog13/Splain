import dictionaryVerifier from "../utility/dictionaryVerifier";
import SplainConfig, {default as Config} from "./config";
import defaults from "./defaultDictionaries";
import Dictionary from "./dictionary";
import executor from "./executor";
import Processor from "./processor";
import finder from "./templateFinder";
import templateStripper from "./templateStripper";
import TokenFinder from "./tokenFinder";

/**
 * Main Splain Class and intended interface with library.
 */
export default class Splain {

    /**
     * Process/compile the given template
     * @param {string} text - the string to compile
     * @param {Processor} processorInstance - the current process instance
     * @returns {*}
     */
    public static processTemplate(text, processorInstance) {
        if (!processorInstance) {
            processorInstance = new Processor();
        }
        // for all the templates in the given test
        finder.getTemplates(text, processorInstance.config).forEach((template) => {
            // strip it, tokenize it and compile it
            const strippedTemplate = templateStripper.stripTemplate(template, processorInstance.config),
                tokens = TokenFinder.getTokens(strippedTemplate, processorInstance.config);
            let compiledTemplate = executor.run(tokens, processorInstance);
            // if the result contains a template recursively re run it
            if (finder.containsTemplate(compiledTemplate, processorInstance.config)) {
                compiledTemplate = this.processTemplate(compiledTemplate, processorInstance);
            }
            // replace the template with its compiled version and store its resolution
            text = text.replace(`${template}`, compiledTemplate);
            processorInstance.addTemplateResolution(strippedTemplate, compiledTemplate);
        });
        return text;
    }

    public config: Config;
    public dictionaries: { default: Dictionary };

    /**
     * Create a new instance of Splain
     * @param {Object} [initialDictionary] - Optional JSON object to use as initial dictionary.
     */
    constructor(initialDictionary?: object) {
        this.new(initialDictionary);
    }

    /**
     * Create a new instance of Splain
     * @param {Object} [initialDictionary] - Optional JSON object to use as initial dictionary.
     */
    public new(initialDictionary) {
        this.dictionaries = {default: new Dictionary()};
        this.dictionaries.default.addEntry(initialDictionary || defaults);
        this.config = new SplainConfig();
    }

    /**
     * Sets a config parameter
     * @param {string} key - the parameter to configure
     * @param value - the value to set the parameter to
     * @returns {Config}
     */
    public configure(key, value) {
        this.config.configure(key, value);
    }

    /**
     * Add an entry to a splain dictionary
     * @param {Object} entry - The entry to add in the form of JSON (can be multiple layers deep and have multiple roots). Also accepts array when used with the name param
     * @param {string} [dictionaryName] - The name of the entry if an array was given instead of JSON. this is long hand for simply using JSON {name:[entries]}
     */
    public addEntry(entry, dictionaryName) {
        if (!dictionaryName) {
            dictionaryName = "default";
        }
        if (!this.dictionaries[dictionaryName]) {
            this.dictionaries[dictionaryName] = new Dictionary();
        }
        this.dictionaries[dictionaryName].addEntry(entry);
    }

    /**
     * Process a given string compiling all the templates in it.
     * @param {string} text - the text or string to compile (that contains splain templates
     * @param {object} [options] - an array of options e.g dictionaryName or variables
     * @returns {string} - the compiled template
     */
    public process(text, options?: any) {
        options = options || {};
        // n.b options contains variables, dictionary name, contexts etc
        if (!options.dictionaryName) {
            options.dictionaryName = "default";
        }
        return Splain.processTemplate(text, new Processor(this.dictionaries[options.dictionaryName], this.config, options));
    }

    /**
     * verifies all entries in a dictionary compile to something
     * @param dictionary
     * @returns {*}
     */
    public verifyDictionary(dictionary) {
        return dictionaryVerifier.verifyEntries(dictionary);
    }

}
