let Splain = require("./splain");

Splain.addEntry({greeting: ["hello", "howdy", "hey", "hi"]});

Splain.addEntry({
    adj: {
        size: {
            xxl:["enormous","massive","gigantic","colossal"],
            xl:["giant","huge", "vast","mammoth"],
            l:["big","jumbo", "large"],
            s:["small", "slight"],
            xs:["tiny","minuscule"]
        },
        temp:{
            cold:["cold","freezing","icy"],
            warm:["hot", "boiling","sweltering"]
        },
        difficulty:{
            hard:["difficult","hard","troublesome"],
            easy:["easy","simple","effortless"]
        },
        interesting:["interesting","appealing","delightful","engaging","compelling"],
        veryInteresting:["{{adverbs.very adj.interesting}}", "{{adj.size.xxl`ly` adj.interesting}}"]
    },
    adverbs:{
        speed:{
            fast:["quickly","speedily","hastily","rapidly"],
            slow:["slowly","sluggishly","unhurriedly"]
        },
        very:["very", "exceedingly", "awfully","greatly"]
    }
});

let splainExplination = "{{{{greeting`.`}}?4}}Do you find making dynamic text{{{{ adverbs.very}}?4 adj.difficulty.hard}}? Using splain {{`helps`|`lets you`}} make {{adj.interesting|adj.veryInteresting}} text. Its {{adj.difficulty.easy}}";
for(let i=0; i <3; i++) {
    console.log(Splain.process(splainExplination));
}

console.log("\n");

Splain.addEntry({weather:{
    warm:["really {{adj.temp.warm}}","{{adverbs.very adj.temp.warm}}", "hot hot hot","hotter than the sun"],
    cold:["really {{adj.temp.cold}}","{{adverbs.very adj.temp.cold}}", "arctic", "pretty chilly"],
    rainy:["pouring it down", "drizzly", "raining cats and dogs"],
    comments:{
        intro:["it's going to be", "coming up it'll be", "later it'll be", "today im predicting it'll be", "today will be"],
        itemReminder:["so pack", "so don't forget", "better bring"],

        warm:["{{weather.comments.itemReminder}} the sunscreen", "so stay hydrated", "good luck", "sounds like it's time for a barbecue"],
        cold:["{{weather.comments.itemReminder}} {{pronoun}} sweater", "{{weather.comments.itemReminder}} {{pronoun}} hoody", "{{weather.comments.itemReminder}} {{pronoun}} coat", "brrrrr!"],
        rainy:["{{weather.comments.itemReminder}} {{pronoun}} umbrella", "{{weather.comments.itemReminder}} {{pronoun}} jacket", ",no need to water the garden!"]
    },
    report:{
        warm:["{{weather.warm weather.comments.warm?2}}"],
        cold:["{{weather.cold weather.comments.cold?2}}"],
        rainy:["{{weather.rainy weather.comments.rainy?2}}"],
    }
},
    pronoun:["a", "your"]
});

let weatherReport = "{{weather.comments.intro weather.report.cold|weather.report.warm|weather.report.rainy}}";

for(let i=0; i <5; i++) {
    console.log(Splain.process(weatherReport));
}
