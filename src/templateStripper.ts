import Config from "./config";

export default class TemplateStripper {
    /**
     * strips the template deliminators, leaves inner templates remaining
     * @param {string} template - the template to strip
     * @param {Config} config - the splain config
     * @returns {*}
     */
    public static stripTemplate(template: string, config: Config): string {
        const open = template.indexOf(config.templateTokens.opening),
            close = template.lastIndexOf(config.templateTokens.closing) - config.templateTokens.closing.length;
        if (open > -1) { template = template.slice(0, open) + template.slice(open + config.templateTokens.opening.length); }
        if (close > -1) { template = template.slice(0, close) + template.slice(close + config.templateTokens.opening.length); }
        return template;
    }

}
