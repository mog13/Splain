import {Config,DefaultConfig} from "./Config";
import {Dictionary} from "./Dictionary";
import {ProcessInfo, Processor} from "./Processor";

class Splain {
    config: Config = DefaultConfig;
    dictionary:Dictionary = new Dictionary();
    processor: Processor = new Processor(this.dictionary);

    process(input: string, contexts:object={}, forceRefresh:boolean = true): ProcessInfo {
        return this.processor.process(input,this.config, forceRefresh,{contexts});
    }

    execute(input:string):string {
        return this.process(input).value;
    }

    addEntry(entry) {
        this.dictionary.addEntry(entry,this.config);
    }

    newDictionary(entries) {
        this.dictionary = new Dictionary();
        this.processor  = new Processor(this.dictionary);
        this.addEntry(entries)
    }

};


export = new Splain()
