Splain.addEntry({use: ["use", 'implement', 'utilize', 'adopt']});
Splain.addEntry({change: ["change", 'update', 'adjust', 'develop', "transfrom", "vary", "diversify", "renew", "refresh"]});
Splain.addEntry({text: ["text", 'sentences', 'apps', 'sofware', "words", "lines", "message"]});

Splain.addEntry({quickly: ["quickly", 'expeditiously', 'hastily', 'rapidly', "speedily", "swiftly", "instantly", "lightning fast"]});

Splain.addEntry({easily: ["easily", 'comfortably', 'smoothly', 'freely', "conveniently", "efficiently", "simply", "painlessly", "with ease"]});


Splain.addEntry({
        weather: {
            warm: ["really {{adj.temp.warm}}", "{{adverbs.very adj.temp.warm}}", "hot hot hot", "hotter than the sun","like living in desert","hotter than an oven","like an inferno", "tropical"],
            cold: ["really {{adj.temp.cold}}", "{{adverbs.very adj.temp.cold}}", "arctic", "pretty chilly", "too cold to bother", "cold enough to freeze your eyes shut", "warmer in the fridge"],
            rainy: ["pouring it down", "drizzly", "raining cats and dogs", "absolutely drenching wet", "{{adverbs.very 'wet'|'rainy'}}"],
            comments: {
                intro: ["Its going to be", "Coming up itl be", "Later itl be", "Today im predicting itl be", "Today will be","The weather will be", "Our computers predict itl be"],
                itemReminder: ["So pack", "So don't forget", "Better bring"],

                warm: ["{{weather.comments.itemReminder}} the sunscreen", "So stay hydrated", "Good luck", "Sounds like its time for a barbecue", "I hope you like it hot"],
                cold: ["{{weather.comments.itemReminder}} {{pronoun}} sweater", "{{weather.comments.itemReminder}} {{pronoun}} hoody", "{{weather.comments.itemReminder}} {{pronoun}} coat", "brrrrr!", "Maybe we should migrate for the winter?", "Time to book that tropical holiday"],
                rainy: ["{{weather.comments.itemReminder}} {{pronoun}} umbrella", "{{weather.comments.itemReminder}} {{pronoun}} jacket", "No need to water the garden!","{{weather.comments.itemReminder}} wellys and splash in some puddles"]
            },
            report: {
                warm: ["{{weather.warm}}. {{weather.comments.warm?2}}"],
                cold: ["{{weather.cold}}. {{weather.comments.cold?2}}"],
                rainy: ["{{weather.rainy}}. {{weather.comments.rainy?2}}"],
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


let splainComponent = Vue.component('splain', {
    data: function () {
        return {
            output: this.input
        }
    }
    ,
    props: ['input'],
    methods: {
        process: function () {
            this.output = Splain.process(`{{${this.input}}}`);
        }
    },
    template: `<span class="splain-example" v-on:click="process">{{output}}</span> `
});

let weatherComponent = Vue.component('weatherComponent', {
    data: function () {
        return {
            cold: "weather.report.cold",
            rainy: "weather.report.rainy",
            warm: "weather.report.warm",
            intro: "weather.comments.intro",
            output: Splain.process("{{weather.comments.intro weather.report.cold|weather.report.warm|weather.report.rainy}}")
        }
    },
    methods: {
        process: function (type) {
            this.output = Splain.process(`{{${this.intro} ${type}}}`);
        }
    },
    template: `<div class="text-muted">
            <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary text-danger"  v-on:click="process(warm)"> Warm <i class="fa fa-sun-o fa-lg"></i> </button>
                    <button type="button" class="btn btn-secondary"  v-on:click="process(rainy)"> Rainy <i class="fa fa-tint fa-lg"></i> </button>
                    <button type="button" class="btn btn-secondary text-info"  v-on:click="process(cold)"> Cold <i class="fa fa-snowflake-o fa-lg"></i> </button>
                </div> 

            <p class="weather-text text-success margin-top--l">{{output}}</p>
</div>`
});


let app = new Vue({
    el: "#app",
    components: {splain: splainComponent, weatherComponent},
    methods: {
        globalProcess: function () {
            this.$broadcast('globalProcess');
        }
    }
});