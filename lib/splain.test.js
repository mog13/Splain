import splain from "./splain";

describe("when i use splain ", () => {
   let Splain = new splain();

   it("should be able to compile a sentence",()=>{
       Splain.dictionary.addEntry({test:["works"]});
       expect(Splain.process("it {{test}}!")).toBe("it works!");
   })
});