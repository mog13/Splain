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
});