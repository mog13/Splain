import Dictionary from "./dictionary";
import SplainConfig from "./splainConfig";
import defaults from "./defaultDictionaries";
import finder from "./templateFinder";
import processor from "./templateProcessor";
import executor from "./templateExecutor";
import SplainContext from "./splainContext";

export default class Splain {
    constructor() {
        this.dictionary = new Dictionary();
        this.dictionary.addEntry(defaults);
        this.config = new SplainConfig();
    }

    addEntry(JSON, name) {
        this.dictionary.addEntry(JSON, name);
    }

    process(text, addQuotes, context) {
        if (!context) {
            context = new SplainContext(this.dictionary, this.config);
        }
        finder.getTemplates(text, context)
            .map(template => finder.stripTemplate(template, context))
            .forEach(template => {
                if (finder.containsTemplate(template, context)) {
                    let output = `${this.process(template, true, context)}`;
                    text = text.replace(template, output);
                    template = `${output}`;
                }
                let compiledTemplate = executor.run(processor.getTokens(template), context);
                if (finder.containsTemplate(compiledTemplate, context)) {
                    compiledTemplate = this.process(compiledTemplate, false, context);
                }
                if (addQuotes) compiledTemplate = `\`${compiledTemplate}\``;
                text = text.replace(`${this.config.templateTokens.opening}${template}${this.config.templateTokens.closing}`, compiledTemplate);
            });

        return text;
    }

}
