
class Splain {
    constructor() {
        this.regex = {
            groupSelector: /\{.+?\}/g,
            chanceSelector: /\?[1-9]?(?=[\| ])/g,
        }
    }
    $trimGroup(input){
        return input.substring(1,input.length-1);
    }

    $findGroups(input){
        return input.match(this.regex.groupSelector);
    }

    $findInputs(input) {
        input = input.replace(/[\?|](?=([^"]*"[^"]*")*[^"]*$)/g," ");
        return (input).split(" ").filter(function(n){
            return n != "" }); ;
    }

    $getExecutionArray(input) {
        let inputs = this.$findInputs(input),
            execs = [];
        while(input.length>0) {
            // if there arnt inputs or the input is the next part
            if (input[0] == ' '){
                input = input.slice(1);
            }
            else if (inputs.length == 0  || input.indexOf(inputs[0]) > 0) {
                execs.push(input[0]);
                input = input.slice(1);
            }
            else {
                execs.push(inputs[0]);
                input = input.replace(inputs[0], "");
                inputs.shift();
            }
        }
        return execs;
    }

}

module.exports = Splain;