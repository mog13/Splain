import SplainLib from "./src/splain";

describe("when im using splain", () => {

    describe("when im using the library", () => {
        runHighlevelSuite(new SplainLib());
    });
    describe("when im using the compiled version", () => {
        let SplainComp = require("./splain");
        runHighlevelSuite(SplainComp);
    });
});


function runHighlevelSuite(splainInstance) {
    it("should expose a splain object on the window", () => {
        expect(splainInstance).toBeDefined();
    });

    describe('when using basic templates', function () {
        it('should be able to compile a simple template', function () {
            splainInstance.addEntry({test: ["works"]});
            expect(splainInstance.process("it {{test}}!")).toBe("it works!");
        });

        it("should be able to handle templates in dictionaries", () => {
            splainInstance.addEntry({splain: ["splain is written in {{language}}"], language: ["JS"]});
            expect(splainInstance.process("{{splain}}")).toBe("splain is written in JS");
        });

        it("should be able to handle recursive templates", () => {
            splainInstance.addEntry({test: ["works"]});
            expect(splainInstance.process("{{{{`it` test}}`!`}}")).toBe("it works!");
        });

        it("should be able to handle multiple recursive templates", () => {
            splainInstance.addEntry({greeting: ["Hello"], place: ["world"], from: ["from splain"]});
            expect(splainInstance.process("{{greeting {{place {{from}}}}}}")).toBe("Hello world from splain");
        });

        it("should be able to handle multiple levels of templates", () => {
            splainInstance.addEntry({test: ["Splain"]});
            expect(splainInstance.process("{{test{{test{{test}}{{test}}}}{{test}}}}")).toBe("SplainSplainSplainSplainSplain");
        });

    });

    describe("when i have malformed templates", () => {

        it("should handle unclosed template", () => {
            splainInstance.addEntry({test1: ["a"], test2: ["b"], test3: ["{{test4}}"], test4: ["{{fake}}"]});
            expect(function () {
                splainInstance.process("it {{test1 {{test2}} {{test1 test2 test4 {{test3 test4}}}}");
            }).toThrow("Error: not enough closing tokens found in it {{test1 {{test2}} {{test1 test2 test4 {{test3 test4}}}}");
        });

        it("should handle unopened template", () => {
            splainInstance.addEntry({test1: ["a"], test2: ["b"], test3: ["{{test4}}"], test4: ["{{fake}}"]});
            expect(function () {
                splainInstance.process("it test1 test2}} {{test1 test2 test4 {{test3 test4}}}}}");
            }).toThrow("Error: not enough opening tokens found in it test1 test2}} {{test1 test2 test4 {{test3 test4}}}}}");
        });
    });

    describe("when im using literals", () => {
        beforeEach(() => {
            splainInstance.addEntry({
                singleQuote: ["shouldn't this work? couldn't this work?"],
                doubleQuotes: ["\"should this work\" he wondered"],
                mixedQuotes: ["\"don't fail me now \""]
            });

        });

        describe('When there are quotes in the literals', function () {
            it("should be able to handle multiple single quotes", () => {
                expect(splainInstance.process("{{singleQuote}}")).toBe("shouldn't this work? couldn't this work?");
            });

            it("should be able to handle multiple double quotes", () => {
                expect(splainInstance.process("{{doubleQuotes}}")).toBe("\"should this work\" he wondered");
            });

            it("should be able to handle mixed quotes", () => {
                expect(splainInstance.process("{{mixedQuotes}}")).toBe("\"don't fail me now \"");
            });

            it("should be able to handle literals with quotes in", () => {
                expect(splainInstance.process("{{`don't fail me now`}}")).toBe("don't fail me now");
            });
        });

        it("should be able to handle a ? in a literal", () => {
            expect(splainInstance.process("{{`the ? character wont break it`}}")).toBe("the ? character wont break it");
        });

        it("should be able to handle a | in a literal", () => {
            expect(splainInstance.process("{{`the | character wont break it`}}")).toBe("the | character wont break it");
        });

        it("shouldn't compile a literall with a template in", () => {
            expect(splainInstance.process("`{{this should work}}`")).toBe("`{{this should work}}`");
        });

    });

    describe('when i have an unmatched template', function () {
        it("should keep template when unmatched by default", () => {
            splainInstance.addEntry({notMatched: ["unmatched"]});
            expect(splainInstance.process("its {{notworked}}!")).toBe("its notworked!");
        });

        it("should keep template when unmatched by default with nested template", () => {
            splainInstance.addEntry({working: ["operating"], amazing: ["unbelievable"]});
            expect(splainInstance.process("it {{will continue {{working {{even when not matched}}}}}} {{amazing}}!"))
                .toBe("it will continue operating even when not matched unbelievable!");
        });

        it("should replace template with its name by default even if there's multiple templates", () => {
            splainInstance.addEntry({test1: ["a"], test2: ["b"], test3: ["{{test4}}"], test4: ["{{fake}}"]});
            expect(splainInstance.process("{{test1 {{test2}} {{test1 test2 test4 {{test3 test4}}}}}}"))
                .toBe("a b a b fake fake fake");
        });

        it("should replace template with null when configured and unmatched", () => {
            splainInstance.addEntry({notMatched: ["works"]});
            splainInstance.configure("keepTemplateOnUnmatched", false);
            expect(splainInstance.process("it {{wontmatch}}!")).toBe("it null!");
        });

        it("should replace template with null when configured and unmatched with nested template", () => {
            splainInstance.addEntry({tester: ["TEST"], amazing: ["unbelievable"]});
            splainInstance.configure("keepTemplateOnUnmatched", false);
            expect(splainInstance.process("it {{magicString {{magic {{tester}}}}}} {{amazing}}!"))
                .toBe("it null null TEST unbelievable!");
        });
    });

    describe('When im using fixed templates', function () {
        it("should handle fixing a template resolution", () => {
            let entry = {test: ["testing", "tester", "test"], colour: ["blue", "red", "green"]};
            splainInstance.addEntry(entry);
            let result = splainInstance.process("{{::test}} {{::test}} {{::test}}");
            let uniques = Array.from(new Set(result.split(" ")));
            expect(uniques.length).toBe(1);
        });

        it("should handle fixing a template resolution with template resolving to template", () => {
            let entry = {test: ["{{::colour}}"], colour: ["blue", "red", "green"]};
            splainInstance.addEntry(entry);
            let result = splainInstance.process("{{::test}} {{::test}} {{::test}}");
            let uniques = Array.from(new Set(result.split(" ")));
            expect(uniques.length).toBe(1);
        });

        it("should handle fixing a template resolution with nested templates", () => {
            let entry = {test: ["testing", "tester", "test"], colour: ["blue", "red", "green"]};
            splainInstance.addEntry(entry);
            let result = splainInstance.process("{{::test {{::colour}}}}-{{::test {{::colour}}}}-{{::test {{::colour}}}}");
            let uniques = Array.from(new Set(result.split("-")));
            expect(uniques.length).toBe(1);
        });
    });

    describe('when using variable templates', function () {
        it("should handle variable template resolution", () => {
            let variables = {test: () =>1+2};
            let result = splainInstance.process("{{##test}}", {variables});
            expect(result).toBe("3");
        });


        it("should handle variable template resolution with nested templates", () => {
            let variables = {test: () =>"TESTER",colour: "BLUE"};
            let result = splainInstance.process("{{##test {{##colour ##test}}}}", {variables});
            expect(result).toBe("TESTER BLUE TESTER");
        });

        it("should handle variable template resolution with template resolving to template", () => {
            let  getCol= () => {return "BLUE";};
            let variables = {colour:getCol};
            splainInstance.addEntry( {test: ["{{##colour}}"]});
            let result = splainInstance.process("{{test}}", {variables});
            expect(result).toBe("BLUE");
        });

        it("should handle variable template resolution with configured variable token", () => {
            splainInstance.configure("variableResolutionToken", "--");
            let variables = {test: () =>"TESTER"};
            let result = splainInstance.process("{{--test}}", {variables});
            expect(result).toBe("TESTER");
        });
    });

    describe('when I use a different dictionary', function () {
        it("should respect the dictionary context used", () => {
            splainInstance.addEntry({greetings: ["hello"]}, "EN");
            splainInstance.addEntry({greetings: ["bonjour"]},"FR");
            expect(splainInstance.process("{{greetings}}", {dictionaryName:"EN"})).toBe("hello");
            expect(splainInstance.process("{{greetings}}", {dictionaryName:"FR"})).toBe("bonjour");
        });
    });

    describe("When im using entries with contexts", () => {
        it("should respect the array of contexts", () => {
            splainInstance.addEntry({item: [{value: "Car", context: "fast"}]});
            splainInstance.addEntry({
                colors: [{value: "blue", context: "blue"}, {
                    value: "Racing Green",
                    context: ["green", "fast"]
                }, {value: "turquoise", context: "blue"}]
            });
            splainInstance.addEntry({punc: [{value: "!", context: "green"}]});
            expect(splainInstance.process("My {{item}} is {{colors}}{{punc}}")).toBe("My Car is Racing Green!");
        });

        it("should compile templates in order from left to right", () => {
            splainInstance.addEntry({
                a: [{value: "A", context: "letter"}],
                b: [{value: "B", context: "letter"}],
                either: [{value: "D", context: "letter"}, {value: "2", context: "number"}]
            });
            expect(splainInstance.process("{{a {{either}} b}}")).toBe("A D B");
        });

    });

}

