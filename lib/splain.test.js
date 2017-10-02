import splain from "./splain";

describe("when i use splain ", () => {
   let Splain = new splain();

   it("should be able to compile a sentence",()=>{
       Splain.dictionary.addEntry({test:["works"]});
       expect(Splain.process("it {{test}}!")).toBe("it works!");
   });

    it("should be able to handle templates in dictionarys", () => {
        Splain.addEntry({test:["hello world"], test2:["{{test}} it works!"]});
        expect(Splain.process("{{test2}}")).toBe("hello world it works!");
    });

    it("should be able to handle recursive templates", () =>{
        Splain.dictionary.addEntry({test:["works"]});
        expect(Splain.process("{{{{'it' test}}'!'}}")).toBe("it works!");
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


});