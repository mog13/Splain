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
});