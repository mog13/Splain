import {Token} from "../Token";
import {Dictionary} from "../Dictionary";
import {ProcessInfo} from "../Processor";
import {Entry} from "../Entry";
import {matchContexts} from "./ContextMatcher";
import {Config} from "../Config";

export function executeToken(token:Token, dictionary:Dictionary,config:Config, processInfo:ProcessInfo):any {

    const choices = dictionary.getEntries(token.value);
    if(!choices) return null;

    const contextualChoices: Entry[] = choices.filter((entry)=>{
        return matchContexts(entry,processInfo.contexts);
    });

    const weightedChoices: Entry[] = [];
    contextualChoices.forEach((choice:Entry)=>{
       for(let n =0;n <Math.min(choice.computedWeight *choice.weight, config.weights.maxWeight); n++) {
           weightedChoices.push(choice)
       }
    });

    if(weightedChoices.length ===0) return null;
    return weightedChoices[Math.floor(Math.random()* weightedChoices.length)];
}
