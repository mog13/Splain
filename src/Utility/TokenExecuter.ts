import {Token} from "../Token";
import {Dictionary} from "../Dictionary";
import {ProcessInfo} from "../Processor";

export function executeToken(token:Token, dictionary:Dictionary, processInfo:ProcessInfo):any {

    const choices = dictionary.getEntries(token.value);


    return null;
}
