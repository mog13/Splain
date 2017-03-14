class Splain {
    constructor() {
        this.regex = {
            groupSelector: /\{.+?\}/g,
            chanceSelector: /\?[0-9]*/
        };
        this.templates = {};
    }

    addTemplate(templateName, templateValue) {
        if (this.templates[templateName] === undefined) {
            this.templates[templateName] = templateValue;
        }
        else {
            throw "the template group " + templateName + "already exists";
        }
    }

    getTemplate(templateName) {
        return this.templates[templateName];
    }


    $trimGroup(input) {
        return input.substring(1, input.length - 1);
    }

    $findGroups(input) {
        return input.match(this.regex.groupSelector);
    }

    $findInputs(input) {
        input = input.replace(/[\?|](?=([^"]*"[^"]*")*[^"]*$)/g, " ");
        return (input).split(" ").filter(function (n) {
            return n != ""
        });
    }

    $getExecutionArray(input) {
        let inputs = this.$findInputs(input),
            execs = [];
        while (input.length > 0) {
            // if there arnt inputs or the input is the next part
            if (input[0] == ' ') {
                input = input.slice(1);
            }
            else if (inputs.length == 0 || input.indexOf(inputs[0]) > 0) {
                if (input[0] == '?') {
                    var exec = input.match(this.regex.chanceSelector)[0];
                    execs.push({value: exec, type: "?"});
                    input = input.replace(exec, "");
                }
                else {
                    execs.push({value: input[0], type: input[0]});
                    input = input.slice(1);
                }
            }
            else {
                execs.push({value: inputs[0], type: "input"});
                input = input.replace(inputs[0], "");
                inputs.shift();
            }
        }
        return execs;
    }

    $getNearestInputLeft(executionArray, index) {
        for (let i = index - 1; i >= 0; i--) {
            if (executionArray[i].type === "input") return i;
        }
        return -1;
    }

    $getNearestInputRight(executionArray, index) {
        for (let i = index + 1; i < executionArray.length; i++) {
            if (executionArray[i].type === "input") return i;
        }
        return -1;
    }

    $processOrOperators(executionArray) {
        for (let i = 0; i < executionArray.length; i++) {
            if (executionArray[i].type == "|") {
                //delete left
                if (Math.floor((Math.random() * 2))) {
                    let nextLeft = this.$getNearestInputLeft(executionArray, i);
                    if (nextLeft >= 0) {
                        let count = i - nextLeft + 1;
                        executionArray.splice(nextLeft, count);
                        i = nextLeft - 1;
                    }
                } else {
                    let nextRight = this.$getNearestInputRight(executionArray, i);
                    if (nextRight >= 0) {
                        //check if the immediate next command is an input
                        if (nextRight + 1 < executionArray.length && executionArray[nextRight + 1].type == "?") {
                            nextRight++;
                        }
                        let count = nextRight - i + 1;
                        executionArray.splice(i, count);
                        i -= 1;
                    }
                }

            }
        }
        return executionArray;
    }

    $processConditionalOperators(executionArray) {
        for (let i = 0; i < executionArray.length; i++) {
            if (executionArray[i].type == "?") {
                //get the number
                let chance = executionArray[i].value.replace("?", "") | 2;
                if (Math.floor((Math.random() * chance)) == 0) {
                    executionArray.splice(i - 1, 2);
                    i -= 2;
                }

            }
        }
        return executionArray;
    }

    $processInputs(executionArray) {
        for (let i = 0; i < executionArray.length; i++) {
            if (executionArray[i].type == "input") {
                if (this.templates[executionArray[i].value] === undefined) {
                    throw "template " + executionArray[i].value + "doesnt exist";
                }
                else {
                    let selectedTemplate = this.templates[executionArray[i].value];
                    executionArray[i].value = selectedTemplate[Math.floor(Math.random() * selectedTemplate.length)];
                    executionArray[i].type = "output";
                }
            }
        }
        return executionArray;
    }

    $processGroup(execArray) {
        this.$processOrOperators(execArray);
        this.$processConditionalOperators(execArray);
        this.$processInputs(execArray);
    }

    $containsOnlyInputs(execArray) {
        let retVal = true;
        execArray.forEach(exec => {
            if (exec.type !== "input") retVal = false;
        });
        return retVal;
    }


    $compileGroup(splainGroup) {
        let iteration = 0,execArray = [], output = "";
        splainGroup = this.$trimGroup(splainGroup);

        while (iteration < 5 && (iteration == 0 || !this.$containsOnlyInputs(execArray))) {
            execArray = this.$getExecutionArray(splainGroup);
            this.$processGroup(execArray);
            output = (execArray.map(exec => {
                return exec.value
            }).join(" "));
            execArray = this.$getExecutionArray(output);
            iteration++;
        }
        return output;
    }


    compile(input) {
        let groups = this.$findGroups(input);
        groups.forEach((group) => {
           let output = this.$compileGroup(group);
           input = input.replace(group, output);
        });

        return input;
    }
}

module.exports = Splain;