import {findTokens} from "./Utility/TokenFinder";
import {Config, DefaultConfig} from "./Config";
import {Dictionary} from "./Dictionary";
import {executeToken} from "./Utility/TokenExecuter";
import {Entry} from "./Entry";
import deepmerge from "deepmerge";

class Processor {
    info: ProcessInfo = {contexts: {}, breakdown: []};
    dictionary: Dictionary;

    constructor(dictionary: Dictionary) {
        this.dictionary = dictionary;
    }

    Process(input: string, config: Config = DefaultConfig, forceRefresh: boolean = true, processInfo: ProcessInfo = null): ProcessInfo {
        if (forceRefresh) {
            this.info = {contexts: {}, breakdown: []};
        }
        if (processInfo) this.info = deepmerge(this.info, processInfo);
        const tokens = findTokens(input, config);
        findTokens(input, config).forEach(token => {
            if (!token.pure) {
                // use a new processor for the multiple tokens
                const tempProc = new Processor(this.dictionary);
                const processedEntry = tempProc.Process(token.value, config, false, {
                    contexts: this.info.contexts,
                    breakdown: []
                });
                this.info.breakdown.push({"inpureTokenResolution": processedEntry});
                input = input.replace(token.raw, processedEntry.value);
            } else {
                const selectedEntry: Entry = executeToken(token, this.dictionary, this.info);
                this.info.breakdown.push({
                    token,
                    contexts: this.info.contexts,
                    selectedEntry
                });
                input = input.replace(token.raw, selectedEntry ? selectedEntry.value : token.raw);
            }
        });
        this.info.value = input;
        return this.info;

    }
}

interface ProcessInfo {
    contexts: object,
    breakdown?: any[],
    value?: string
}

export {ProcessInfo, Processor}

