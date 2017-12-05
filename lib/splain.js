import Dictionary from "./dictionary";
import SplainConfig from "./splainConfig.js";
import defaults from "./defaultDictionaries";
import finder from "./templateFinder";
import processor from "./templateProcessor";
import executor from "./templateExecutor";

export default class Splain {
    constructor() {
        this.dictionary = new Dictionary();
        this.dictionary.addEntry(defaults);
        this.config = new SplainConfig();
    }

    addEntry(JSON, name) {
        this.dictionary.addEntry(JSON, name);
    }

    process(text, addQuotes) {
        finder.getTemplates(text)
            .map(template => finder.stripTemplate(template))
            .forEach(template => {
                if (finder.containsTemplate(template)) {
                    let output = `${this.process(template, true)}`;
                    text = text.replace(template, output);
                    template = `${output}`;
                }
                let compiledTemplate = executor.run(processor.getTokens(template), this.dictionary);
                if (compiledTemplate.includes("null") && this.config.keepTemplateOnUnmatched) {
                    return;
                }
                if (finder.containsTemplate(compiledTemplate)) {
                    compiledTemplate = this.process(compiledTemplate);
                }
                if (addQuotes) compiledTemplate = `\`${compiledTemplate}\``;
                text = text.replace(`{{${template}}}`, compiledTemplate);
            });

        return text;
    }

}
