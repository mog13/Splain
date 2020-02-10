import {Config} from "../Config";


function FindNextToken(input:string, config:Config): string {
    const openIndex = input.indexOf(config.token.open);

    let nextOpenIndex = input.indexOf(config.token.open, openIndex + config.token.open.length);
    let closeIndex = input.indexOf(config.token.close, openIndex + config.token.open.length);

    if(closeIndex <0 || openIndex< 0) return null;

    while(closeIndex >=0 && nextOpenIndex >=0 && nextOpenIndex < closeIndex) {
        nextOpenIndex = input.indexOf(config.token.open, closeIndex + config.token.close.length);
        if(nextOpenIndex>=0) closeIndex = input.indexOf(config.token.close, nextOpenIndex + config.token.open.length);
    }

   return closeIndex === -1 ? null : input.substring(openIndex,closeIndex + config.token.close.length);
}

export function FindTokens(input:string, config:Config): string[] {
    const foundTokens: string[] = [];

    while(input) {
        const nextToken = FindNextToken(input,config);
        if(!nextToken) input = '';
        else {
            foundTokens.push(nextToken);
            input = input.replace(nextToken, "");
        }
    }

    return foundTokens;
}

