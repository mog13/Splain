import Splain from "../src/splain";
import Dictionary from "../src/dictionary";
import TemplateFinder from "../src/templateFinder";
import Processor from "../src/processor";
import Stripper from "../src/templateStripper";
import TokenFinder from "../src/tokenFinder";

export default {

    processToken(dictionary:any, text:string, splain?:Splain) {

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
            let splainTokens:any = tokens.filter(t => t.type === "splain");

            let tokenCounter =[];
            splainTokens.forEach(token => {
                tokenCounter.push(0);
                token.entries = dictionary.getProcessedEntry(token.data, processorInstance);
                let newEntries = [];
                token.entries.forEach(entry=>{
                    if(TemplateFinder.containsTemplate(entry,splain.config)) newEntries =  newEntries.concat(this.processToken(dictionary,entry,splain));
                    else newEntries.push(entry);
                });
                token.entries = newEntries;
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
                    //@ts-ignore
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

                results.push(newText);
            }while (perm);


        });
        return results;

    }
};