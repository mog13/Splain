import splain from "./splain";

describe("when i use splain ", () => {
   let Splain = new splain();

   it("should be able to compile a sentence",()=>{
       Splain.dictionary.addEntry({test:["works"]});
       expect(Splain.process("it {{test}}!")).toBe("it works!");
   });

    it("should be able to handle templates in dictionarys", () => {
        Splain.addEntry({test:["hello"], test2:["{{test}} world"], test3:["{{test2}} it works!"]});
        expect(Splain.process("{{test3}}")).toBe("hello world it works!");
    });

    it("should be able to handle recursive templates", () =>{
        Splain.dictionary.addEntry({test:["works"]});
        expect(Splain.process("{{{{`it` test}}`!`}}")).toBe("it works!");
    });

    it("should be able to handle multiple recursive templates", ()=>{
        Splain.dictionary.addEntry({test:["Splain"]});
        expect(Splain.process("{{test{{test{{test}}}}}}")).toBe("SplainSplainSplain");
    });

    it("should be able to handle multiple levels of templates", () =>{
        Splain.dictionary.addEntry({test:["Splain"]});
        expect(Splain.process("{{test{{test{{test}}{{test}}}}{{test}}}}")).toBe("SplainSplainSplainSplainSplain");
    });

    describe("should eb able to handle quotes in the template", ()=> {
        beforeEach(()=>{
            Splain.dictionary.addEntry({singleQuote:["shouldn't this work? couldn't this work?"],
            doubleQuotes:['"should this work" he wondered'],
            mixedQuotes:["\"don't fail me now \""]});

        });

        it("should be able to handle multiple single quotes",() =>{
            expect(Splain.process("{{singleQuote}}")).toBe("shouldn't this work? couldn't this work?") ;
        });

        it("should be able to handle multiple double quotes",() =>{
            expect(Splain.process("{{doubleQuotes}}")).toBe("\"should this work\" he wondered") ;
        });

        it("should be able to handle mixed quotes",() =>{
            expect(Splain.process("{{mixedQuotes}}")).toBe("\"don't fail me now \"") ;
        });

        it("should be able to handle literals with quotes in", ()=>{
            expect(Splain.process("{{`don't fail me now`}}")).toBe("don't fail me now");
        });
    });

    it("should be able to handle a ? in a literal", () =>{
        expect(Splain.process("{{`the ? character wont break it`}}")).toBe("the ? character wont break it");
    });

    it("should be able to handle a | in a literal", () =>{
        expect(Splain.process("{{`the | character wont break it`}}")).toBe("the | character wont break it");
    });

    it("should keep template when unmatched by default",()=>{
        Splain.dictionary.addEntry({notMatched:["works"]});
        expect(Splain.process("it {{magicString}}!")).toBe("it magicString!");
    });

    it("should keep template when unmatched by default with nested template",()=>{
        Splain.dictionary.addEntry({tester:["TEST"], amazing:["unbelievable"]});
        expect(Splain.process("it {{magicString {{magic {{tester}}}}}} {{amazing}}!")).toBe("it magicString magic TEST unbelievable!");
    });

    it("shouldnt compile a literall with a template in", () =>{
       expect(Splain.process("`{{this should work}}`")).toBe("`{{this should work}}`");
    });

    it("should replace template with its name by default even if theres multiple templates",()=>{
        Splain.dictionary.addEntry({test1:["a"], test2:["b"], test3:["{{test4}}"], test4:["{{fake}}"]});
        expect(Splain.process("{{test1 {{test2}} {{test1 test2 test4 {{test3 test4}}}}}}")).toBe("a b a b fake fake fake");
    });

    it("should replace template with null when configured and unmatched",()=>{
        Splain.dictionary.addEntry({notMatched:["works"]});
        Splain.config.configure("keepTemplateOnUnmatched", false);
        expect(Splain.process("it {{magicString}}!")).toBe("it null!");
    });

    it("should replace template with null when configured and unmatched with nested template",()=>{
        Splain.dictionary.addEntry({tester:["TEST"], amazing:["unbelievable"]});
        Splain.config.configure("keepTemplateOnUnmatched", false);
        expect(Splain.process("it {{magicString {{magic {{tester}}}}}} {{amazing}}!")).toBe("it null null TEST unbelievable!");
    });

    it("should replace template with null when configured and unmatched with nested template",()=>{
        Splain.dictionary.addEntry({tester:["TEST"], amazing:["unbelievable"]});
        Splain.config.configure("keepTemplateOnUnmatched", false);
        expect(Splain.process("it {{magicString {{magic {{tester}}}}}} {{amazing}}!")).toBe("it null null TEST unbelievable!");
    });
});
