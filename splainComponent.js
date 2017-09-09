Splain.addEntry({use:["use", 'implement','utilize','adopt']});
Splain.addEntry({change:["change", 'update','adjust','develop',"transfrom","vary", "diversify", "renew", "refresh"]});
Splain.addEntry({text:["text", 'sentences','apps','sofware',"words","lines", "message"]});

Splain.addEntry({quickly:["quickly", 'expeditiously','hastily','rapidly',"speedily","swiftly", "instantly", "lightning fast"]});

Splain.addEntry({easily:["easily", 'comfortably','smoothly','freely',"conveniently","efficiently", "simply", "painlessly", "with ease"]});

let splainComponent = Vue.component('splain', {
    data: function () {
        return {
            output: this.input,
            processed:false
        }
    }
    ,
    props: ['input'],
    methods: {
        process: function () {
            this.output = Splain.process(`{{${this.input}}}`);
            this.processed = true
        }
    },
    template: `<span class="splain-example" v-on:click="process">{{output}} <span v-if="processed"></span></span> `
});

let app = new Vue({
    el:"#app",
    components:{splain:splainComponent}
});