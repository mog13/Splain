import Splain from "../src/splain";
import Dictionary from "../src/dictionary";
import TemplateFinder from "../src/templateFinder";
import Processor from "../src/processor";
import Stripper from "../src/templateStripper";
import TokenFinder from "../src/tokenFinder";

export default {

    processToken(dictionary, text, splain) {

        if (!splain) {
            splain = new Splain(dictionary); //allows for just sending part of a dictionary
            splain.config.configure("explicit", true);
            splain.config.configure("keepTemplateOnUnmatched", false);
        }
        //if we havnt been passed a dictionary class then try and create one from the given object
        //@todo make sure new dictionary returns an instance of itself so we can streamline this
        if (!(dictionary instanceof Dictionary)) {
            let newdictionary = new Dictionary();
            newdictionary.addEntry(dictionary);
            dictionary = newdictionary;
        }

        let processorInstance = new Processor();
        //get all the templates
        let results = [];
        TemplateFinder.getTemplates(text, splain.config).forEach(template => {
            //strip it, tokenize it and compile it
            let strippedTemplate = Stripper.stripTemplate(template, splain.config),
                tokens = TokenFinder.getTokens(strippedTemplate, splain.config);

            //PERMEATE
            let splainTokens = tokens.filter(t => t.type === "splain");

            let tokenCounter =[];
            splainTokens.forEach(token => {
                tokenCounter.push(0);
                token.entries = dictionary.getProcessedEntry(token.data, processorInstance);
                token.convert = (processorInstance, n) => {
                    return token.entries? token.entries[n]:null;
                };
            });

            let amountOfTokens = splainTokens.length;
            if (amountOfTokens === 0) {
                return text;
            }
            let perm = true;

            do {
                let newText = "";
                let splainToken = 0;
                tokens.forEach(token=>{
                    newText+=token.convert(processorInstance,tokenCounter[splainToken]);
                    if(token.type==="splain") splainToken++;
                });

                tokenCounter[0]++;
                for(let n =0; n<tokenCounter.length;n++){
                    if(tokenCounter[n] >= splainTokens[n].entries.length) {
                        if(n === tokenCounter.length-1){
                            perm = false;

                        } else {
                            tokenCounter[n + 1]++;
                            for(let i=0;i<n+1;i++)tokenCounter[i]=0;
                        }
                    }
                }
                // if(tokenCounter[tokenCounter.length] > splainTokens[tokenCounter.length].entries.length) perm = false;

                results.push(newText);
            }while (perm)


            // if the result contains a template recursively re run it
            // if (TemplateFinder.containsTemplate(compiledTemplate, processorInstance.config)) compiledTemplate = this.processTemplate(compiledTemplate, processorInstance);
            // //replace the template with its compiled version and store its resolution
            // text = text.replace(`${template}`, compiledTemplate);
            // processorInstance.addTemplateResolution(strippedTemplate, compiledTemplate);
        });
        return results;
        //convert to tokens
        //count the tokens and permeate around all of them
        //each combo
    },

    resolveAll(dictionary, text, splain) {
        let result = [[1, 2], [0, "hello", "test"]].reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));

        if (!splain) {
            splain = new Splain(dictionary); //allows for just sending part of a dictionary
            splain.config.configure("explicit", true);
            splain.config.configure("keepTemplateOnUnmatched", false);
        }
        //if we havnt been passed a dictionary class then try and create one from the given object
        //@todo make sure new dictionary returns an instance of itself so we can streamline this
        if (!(dictionary instanceof Dictionary)) {
            let newdictionary = new Dictionary();
            newdictionary.addEntry(dictionary);
            dictionary = newdictionary;
        }

        let resolutions = [];
        let templates = TemplateFinder.getTemplates(text, splain.config).map(template => {
            let stripped = Stripper.stripTemplate(template, splain.config);
            let entries = dictionary.getProcessedEntry(stripped, processorInstance);
            return {
                template,
                stripped,
                entries
            };
        });

        //if there are no templates the
        if (templates.length === 0) return text;
        //for each template we need to find all the entries


        let processorInstance = new Processor(dictionary, splain.config);

        //get the nth entry
        function resolveEntry(path, n) {
            let entry = dictionary.getProcessedEntry(path, processorInstance);
            if (entry !== null && Array.isArray(entry) && n < entry.length) {
                return entry[n];
            }
            return null;
        }

        for (let i = 0; i < templates.length; i++) {

        }


        //


        // entry.forEach((ent) => {
        //         //     if (TemplateFinder.containsTemplate(ent,splain.config)) {
        //         //         //if it has a template we need to process them all
        //         //     }
        //         //     else {
        //         //         resolutions.push(ent);
        //         //     }
        //         // });
        return resolutions;
    }

    ,

    /*if called without a splain instance will set one up and pass through to recursive calls
    this means original call will make splain at the dictionary level
    but also has the added benefit that you could use it to verify it with a given splain instance*/
    verifyEntries(node, splain, root) {
        if (!splain) {
            splain = new Splain(node.entries || node); //allows for just sending part of a dictionary
            splain.config.configure("explicit", true);
            splain.config.configure("keepTemplateOnUnmatched", false);
        }
        if (node.entries) node = node.entries; //only want to scan entries of dictionary
        let invalidTokens = [];
        for (let key in node) {
            let branch = node[key],
                fullyQualifiedKey = root ? `${root}.${key}` : key;
            if (Array.isArray(branch)) {
                branch.forEach((entry) => {
                    let keyedEntry = `${key}.${entry}`,
                        output = splain.process(`${entry}`);
                    if (output.indexOf("null") >= 0 || output === keyedEntry) invalidTokens.push({
                        token: entry,
                        key: fullyQualifiedKey
                    });
                });
            }
            else {
                invalidTokens = invalidTokens.concat(this.verifyEntries(branch, splain, fullyQualifiedKey));
            }

        }
        return invalidTokens;
    }
    ,
}
;