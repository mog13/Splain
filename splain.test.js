import SplainContext from "./lib/splainContext";

let Splain =  require("./splain");
//Note these are just overarching tests to quickly check the compiled library. see /lib for full tests
describe("when i import the splain library", ()=> {

    it("should expose a splain object on the window", () =>{
        expect(Splain).toBeDefined();
    });

    it("should by default have a dictionary object", () =>{
        expect(Splain.dictionary).toBeDefined();
    });

    it("should populate default dicitionaries", () => {
       expect(Splain.dictionary.getEntry("weather",false, SplainContext.getDefault())).not.toBeNull()
    });

    describe("and i want to compile text through splain",() =>{
        Splain.dictionary.addEntry({test:["works"]});
        expect(Splain.process("it {{test}}!")).toBe("it works!");
    })
});


