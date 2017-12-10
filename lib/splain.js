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
        finder.getTemplates(text, this.config)
            .map(template => finder.stripTemplate(template, this.config))
            .forEach(template => {
                if (finder.containsTemplate(template, this.config)) {
                    let output = `${this.process(template, true)}`;
                    text = text.replace(template, output);
                    template = `${output}`;
                }
                let compiledTemplate = executor.run(processor.getTokens(template), this.dictionary, this.config);
                if (finder.containsTemplate(compiledTemplate, this.config)) {
                    compiledTemplate = this.process(compiledTemplate);
                }
                if (addQuotes) compiledTemplate = `\`${compiledTemplate}\``;
                text = text.replace(`${this.config.templateTokens.opening}${template}${this.config.templateTokens.closing}`, compiledTemplate);
            });

        return text;
    }

}
