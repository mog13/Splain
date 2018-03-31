import Splain from "../lib/splain";

export default {

    /*if called without a splain instance will set one up and pass through to recursive calls
    this means original call will make splain at the dictionary level
    but also has the added benefit that you could use it to verify it with a given splain instance*/
    verifyEntries(node, splain, root) {
        if(!splain){
            splain = new Splain(node.entries || node); //allows for just sending part of a dictionary
            splain.config.configure("explicit", true);
            splain.config.configure("keepTemplateOnUnmatched", false);
        }
        if(node.entries) node = node.entries; //only want to scan entries of dictionary
        let invalidTokens = [];
        for (let key in node) {
            let branch = node[key],
            fullyQualifiedKey = root? `${root}.${key}`:key;
            if(Array.isArray(branch)) {
                branch.forEach((entry)=>{
                    let keyedEntry = `${key}.${entry}`,
                        output = splain.process(`${entry}`);
                    if(output.indexOf("null") >=0 || output === keyedEntry) invalidTokens.push({token:entry,key:fullyQualifiedKey});
                })
            }
            else {
                invalidTokens = invalidTokens.concat(this.verifyEntries(branch,splain, fullyQualifiedKey));
            }

        }
        return invalidTokens;
    },
}