import Dictionary from "./dictionary";
import SplainConfig from "./splainConfig";
import defaults from "./defaultDictionaries";
import finder from "./templateFinder";
import processor from "./templateProcessor";
import executor from "./templateExecutor";
import SplainContext from "./splainContext";

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
        return this.runProcess(text, false, context);
    }

    runProcess(text, addQuotes, context) {
        finder.getTemplates(text, context)
            .map(template => finder.stripTemplate(template, context))
            .forEach(template => {
                if (finder.containsTemplate(template, context)) {
                    let output = `${this.runProcess(template, true, context)}`;
                    text = text.replace(template, output);
                    template = `${output}`;
                }
                let compiledTemplate = executor.run(processor.getTokens(template, context), context);
                if (finder.containsTemplate(compiledTemplate, context)) {
                    compiledTemplate = this.runProcess(compiledTemplate, false, context);
                }
                if (addQuotes) compiledTemplate = `\`${compiledTemplate}\``;
                text = text.replace(`${this.config.templateTokens.opening}${template}${this.config.templateTokens.closing}`, compiledTemplate);
                context.addTemplateResolution(template, compiledTemplate);
            });

        return text;
    }

}
