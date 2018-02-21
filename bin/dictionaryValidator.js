#! /usr/bin/env node
const path = require('path');
let Splain = require("../splain");
let filename = process.argv[2];
if (!filename) {
    console.log("please provide a file for the dictionary. If your dictionary is dynamic or embedded in you application then please use the DictionaryVerifier JS utility ")
}
else {

    if (!path.isAbsolute(filename)) {
        filename = path.parse(process.cwd() + filename.replace("./", "/"));
        filename = path.format(filename)
    }

    let dictionaryContent = require(filename);
    tokens = Splain.verifyDictionary(dictionaryContent);
    if (tokens.length === 0) console.log("all tokens in dictionary compiled successfully");
    else {
        tokens.forEach(token => {
            console.log(`token ${token.token} failed to compile at position ${token.key}`);
        })
    }
}
