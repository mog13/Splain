# Splain
###### Small parser to create more interesting language/sentances

[![Build Status](https://travis-ci.org/mog13/Splain.svg?branch=master)](https://travis-ci.org/mog13/Splain)
[![codebeat badge](https://codebeat.co/badges/236d5abc-9188-48b7-8e3e-d2cec07404e8)](https://codebeat.co/projects/github-com-mog13-splain-master)
[![codecov](https://codecov.io/gh/mog13/Splain/branch/master/graph/badge.svg)](https://codecov.io/gh/mog13/Splain)

see it in action: https://mog13.github.io/Splain/

## Installation
you can install:

* via npm `npm install @mog13/splain`
* copy splain.js into your source

and then import it into your project via:

* a script tag: `<script src="./link_to_splain.js"/>`
* require `require("@mog13/splain")`
* import `import Splain from "@mog13/splain"`


## Overview
Splain is a template processor that helps you build more varied text and dynamic language.
To do this you provide splain with a *dictionary* of options and then reference them in *templates*. These *templates* are made up of *tokens* which are then resolved recursively.

Using a blend of different tokens and template allows you to quickly build up dynamic text which can be as simple as random selection or a rich custom response informed by runtime variables.

## Features

### Templates
At its simplest it can be utilized to reference a pool of words to select from. For example you can imagine a use case for greeting a customer. a hardcoded message may become stale so
instead we can use splain to provide some variety. We do this by populating a dictionary entry keyed `greeting` and reference it in a template that we then process. When processing Splain
will simply swap the token for something in the associated entry.
```JS
Splain.addEntry({greeting: ["hello", "howdy", "hey", "hi","welcome","greetings"]});
let greetingMessage = Splain.process("{{greeting}}! have a great day!");
console.log(greetingMessage);
```

Every time the Process function is run the templates will be recompiled giving a new output. For example we could create a dynamic loading screen.

```JS
Splain.addEntry({loadingMessage:["collecting bits", "compiling bytes", "reticulating splines", "calculating normals", "rebooting router"]});

function showLoadingMessage() {
    let loadingMessage = Splain.process("loading: {{loadingMessage}}");
    console.log(loadingMessage);
}

setInterval(showLoadingMessage,5000);
```

Splain templates can contain many tokens. so for example `{{token1 token2}}`. Strings to process can also contain many templates e.g. `{{token1}} not a token {{token2}}`.
Splain dictionaries are just JSON objects and can be layered allowing you to create categories or collect similar entries together.
Entries can also contain templates themselves to create a more complex structure. doing this can mean that each additional entry can result in exponentially more possible outcomes!
Using this information we can start to build up a more sophisticated use case, like a weather app.

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


**Weighting**
In some instances you may want to provide weights to an entry. This effectively loads the dictionary with multiple copies of the entry to bias towards it. For example we could re-purpose our
loading example to show a easter egg message once in a while by weighting our normal messages much higher.

```JS

Splain.addEntry({loadingMessage:[{value: "constructing models", weight: 100},{value: "calculating indices", weight: 100},"stealing credit card information"]});

function showLoadingMessage() {
    let loadingMessage = Splain.process("loading: {{loadingMessage}}");
    console.log(loadingMessage);
}

setInterval(showLoadingMessage,5000);

```
*note adding a weighting is optional per entry, as we can see in the example not all entries require a weight and you are free to mix and match*


**Fixed resolution**

Sometimes you may want to fix a tokens output in a given process, i.e if that token is called again use the previous result. you can use the :: operator to make it fixed resolution.

```JS
Splain.addEntry({language:["JS","Javascript","ECMAscript"]});

console.log(Splain.process("{{::language}} is the best language, you can use {{::language}} to do anything!"));

```


**Contexts**

It may not make sense to just pick a random entry and you may want Splain to make a smarter choice based on preceding selections. You can achieve this with contexts. If splain selects
an entry with a context then in future template executions it will try and select from entries with the same context. If none are discovered then it will revert to the original pool of options.

```JS
Splain.addEntry({colors:[{value:"blue", context:"blue"},{value:"green", context:"green"},{value:"turquoise", context:"blue"}]});
Splain.addEntry({environments:[{value:"sea", context:"blue"},{value:"grass", context:"green"},{value:"sky", context:"blue"},{value:"forest", context:"green"}]});


console.log(Splain.process("wow look at those lovely {{colors environments}}"));
//note the context is at the process level so it will persist over different templates
console.log(Splain.process("wow look at those lovely {{colors}} {{environments}}"));

```

**Variables**

You can make a variable template using the ##token. This will use a variables object that you can pass into the process function to resolve the token.

```JS

Splain.addEntry({late:["almost time for bed!","the day is almost over!"],early:["the day has just begun!"]});

let getTimePhrase = function() {
    return new Date().getHours()<12? "{{early}}":"{{late}}";
};

let bestLibrary = "Splain";

console.log(Splain.process("you should try {{##library}}",{library:bestLibrary}));

console.log(Splain.process("we are on month {{##currentMonth}}/12",{currentMonth:()=>{return new Date().getMonth()+1}}));

console.log(Splain.process("look at the time, it's {{##currentTime}}! {{##timePhrase}}",{currentTime:()=>{return new Date().getHours() + ":" +new Date().getMinutes()},timePhrase:getTimePhrase()}));

```

## Operators

You can use operators to act on other tokens. 

**literal**

You can specify a word should be displayed as is by surrounding it with backticks (`). You could just place the word outside the template and it wouldn't be touched, 
however sometimes you may want to apply some of Splains other features to a literal without it necessarily being translated through a dictionary.

**or**

A | token represents an either or so will select either the proceeding or preceding token. 

```js
console.log(Splain.process("hello {{`world`|`internet`}}"))
```


**conditional**

A ? token provides a 1 in X chance of being rendered. X can be specified by providing the number after the ?.
If no number is specified it is defaulted to 2.

```js
console.log(Splain.process("goodbye!{{`and thanks for all the fish`?42}}"))
```

So in the above roughly one in every 42 compiles there will be a hitchhikers guide to the galaxy reference. 

## Configuration
Splain can be configured with several options via its config object: `Splain.config.configure(property, value);`

The following properties can be changed:

**keepTemplateOnUnmatched** (default: true)

This boolean controls what is returned on the event a token isn't matched. If true it will return the name of the token.
If false it will return null.


**fixedResolutionToken** (default: "::")

This is the token used to identify or  define a fixed resolution token


**variableResolutionToken** (default: "##")

This is the token used to identify or define a variable resolution token

**templateTokens** 
default: `{opening: "{{", closing: "}}"}`

This defines how a template is identifies

## Developing
Pull requests welcome (with relevant tests). 

`npm install` to install

`npm build` to bundle with webpack;

`npm test` to run all the tests. (`npm lint-fix` will fix minor eslint issues such as spacing)

Feel free to raise bugs/issues. Issues containing supporting code or tests to prove the bug would be very appreciated

## Testing
Testing is done via Jest and Jasmine.
Tests can be run with `npm test` or simply `jest`

## Credits and thanks
* <a href="https://github.com/Luke-Rogers" target="_blank">Luke Rogers</a> For all his contributions, ideas and implementing the lions share of V2.
* The many contributors from <a href="https://hacktoberfest.digitalocean.com/" target="_blank">Hacktoberfest</a> for helping and joining in