# Splain
###### small parser to create more interesting language/sentances

[![Build Status](https://travis-ci.org/mog13/Splain.svg?branch=master)](https://travis-ci.org/mog13/Splain)

see it in action: https://mog13.github.io/Splain/

*note this readme is a work in progress and as such is not complete and contains many splling errors*

## overview
Splain is a template processor that lets you build more varied and dynamic text and language. It works by allowing you to building up dictionaries of
interchangeable words and vocabulary.

At its simplest it can be utilized to reference a pool of words to select from. For example you can imagine a use case for greeting the user. a hardcoded message may become stale.
instead we could use splain to provide some variety. 

```JS
Splain.addEntry({greeting: ["hello", "howdy", "hey", "hi","welcome","greetings"]});
let greetingMessage = Splain.process("{{greeting}}! have a great day!");
console.log(greetingMessage);
```

Splain takes in a simple string and looks for templates. A Splain template is anything surrounded with double parenthesis `{{}}`
This will then look for and process tokens and replace the template accordingly. The simplest token being as above, just a reference within our dictionary.

Every time the Process function is run the templates will be recompiled giving a new output so going back to our loading example:

```JS
Splain.addEntry({loadingMessage:["collecting bits", "compiling bytes", "reticulating splines", "calculating normals", "rebooting router"]});

function showLoadingMessage() {
    let loadingMessage = Splain.process("loading: {{loadingMessage}}");
    console.log(loadingMessage);
}

setInterval(showLoadingMessage,5000);
```

Splain templates can contain many tokens. so for axample `{{token1 token2}}`. Splain dictionaries are just JSON objects and can be layered.
Splain dictionaries can also contain tokens themselves. using this inofmration we can start to build up a more sophisticated use case, like a weather app.

```JS

Splain.addEntry({
        weather: {
            warm: ["really {{adj.temp.warm}}", "{{adverbs.very adj.temp.warm}}", "hot hot hot", "hotter than the sun","like living in desert","hotter than an oven","like an inferno", "tropical"],
            cold: ["really {{adj.temp.cold}}", "{{adverbs.very adj.temp.cold}}", "arctic", "pretty chilly", "too cold to bother", "cold enough to freeze your eyes shut", "warmer in the fridge"],
            comments: {
                intro: ["Its going to be", "Coming up itl be", "Later itl be", "Today im predicting itl be", "Today will be","The weather will be", "Our computers predict itl be"],
                itemReminder: ["So pack", "So don't forget", "Better bring"],
                warm: ["{{weather.comments.itemReminder}} the sunscreen", "So stay hydrated", "Good luck", "Sounds like its time for a barbecue", "I hope you like it hot"],
                cold: ["{{weather.comments.itemReminder}} {{pronoun}} sweater", "{{weather.comments.itemReminder}} {{pronoun}} hoody", "{{weather.comments.itemReminder}} {{pronoun}} coat", "brrrrr!", "Maybe we should migrate for the winter?", "Time to book that tropical holiday"]
            },
            report: {
                warm: ["{{weather.warm}}. {{weather.comments.warm?2}}"],
                cold: ["{{weather.cold}}. {{weather.comments.cold?2}}"]
            }
        },
        pronoun: ["a", "your"],
        adj: {
            temp: {
                cold: ["cold", "freezing", "icy", "chilly", "frigid", "frosty", "polar", "bitterly", "wintry","snowy"],
                warm: ["hot", "boiling", "sweltering", "balmy", "humid","sizzling","sweltering","warm","sunny","summery"]
            },
        },
        adverbs: {
            very: ["very", "exceedingly", "awfully", "greatly", "decidedly", "extraordinarily","incredibly","unusually","surprisingly", "excessively", "quite","uncommonly"]
        }
    }
);

function weatherReport(degreesC) {
     let report = "{{weather.comments.intro weather.report.cold}}";
     if(degreesC > 20) report = "{{weather.comments.intro weather.report.warm}}";
     return Splain.process(report);
     }

console.log(weatherReport(15));
console.log(weatherReport(30));

```
Splain templates can contain more than just a dictionary reference. 

You can specify a word should be displayed as is by surrounding it with quotes (single or double), this is a literal. You could just place the word outside the template and it would be touched.
However sometimes you may want to apply some of Splains other features to a literal without it necessarily being translated through a dictionary.

a | token represents an either or so will select either the pro or preceding token. 

```js
console.log(Splain.process("hello {{'world'|'internet'}}"))
```

Finally a ? token is a conditional. It provides a 1 in X chance of being rendered. X can be specified by providing the number after the ?.
If no number is specified it is defaulted to 2.

```js
console.log(Splain.process("goodbye!{{'and thanks for all the fish'?42}}"))
```

so in the above roughly one in every 42 compiles there will be a hitchhikers guide to the galaxy reference. 

see example.js (run via `node example.js`) for more examples of Splain.

*note: currently sue to how literals work there is some issue with using quotes in words (there is a bug raised around this).....*

## Advanced use
Splain templates can be built up as much as you want. dictionary items can themselves contain templates.

*a lot of advanced usage is so far un tested and undocumented*

## Installation
you can install:

* via npm `npm install @mog13/splain`
* copy splain.js into your source

and then import it into your project via:

* a script tag: `<script src="./link_to_splain.js"/>`
* require `require("@mog13/splain")`
* import `import Splain from "@mog13/splain"`

## Developing
pull requests welcome (with relevant tests). 

`npm install` to install

`npm build` to bundle with webpack;

feel free to raise bugs/issues. Issues containing supporting code or tests to prove the bug would be very appreciated

## Testing
Testing is done via Jest and Jasmine.
tests can be run with `npm test` or simply `jest`
