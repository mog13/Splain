import {Token} from "../Token";
import {Dictionary} from "../Dictionary";
import {ProcessInfo} from "../Processor";
import {Entry} from "../Entry";
import {matchContexts} from "./ContextMatcher";

export function executeToken(token:Token, dictionary:Dictionary, processInfo:ProcessInfo):any {

    const choices = dictionary.getEntries(token.value);
    if(!choices) return null;

    const weightedChoices: Entry[] = [];
    // we are doing it this way around to preserve weightings and then cut down contexts.
    // doing the reverse would give weightings that weren't balanced with applicable choices.
    choices.forEach((choice:Entry)=>{
       for(let n =0;n <choice.computedWeight *choice.weight; n++) {
           weightedChoices.push(choice)
       }
    });

    const contextualChoices: Entry[] = weightedChoices.filter((entry)=>{
        return matchContexts(entry,processInfo.contexts);
    });

    if(contextualChoices.length ===0) return null;
    return contextualChoices[Math.floor(Math.random()* contextualChoices.length)];
}
