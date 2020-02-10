import {Entry} from "../Entry";

// @todo add config to read matching style
// default matching scheme is match if entry has no contexts, entry has no matching context types or if it does at least one value matches
export function matchContexts(entry:Entry, contexts:object):boolean {

    if(Object.keys(entry.contexts).length ===0) return true;

    const matchingContexts = Object.keys(entry.contexts).filter((context)=>contexts[context]);
    if(matchingContexts.length===0) return true;

    let foundMatchingContext = false;
    matchingContexts.forEach((context) => {
        const matchingContextEntries = entry.contexts[context].filter(contextEntry => {
            return contexts[context].indexOf(contextEntry) >=0;
        });
        if(matchingContextEntries.length > 0) foundMatchingContext =  true;
    });

    return foundMatchingContext;
}
