import SplainContext from "./lib/splainContext";

let Splain =  require("./splain");
//Note these are just overarching tests to quickly check the compiled library. see /lib for full tests
describe("when i import the splain library", ()=> {

    it("should expose a splain object on the window", () =>{
        expect(Splain).toBeDefined();
    });

    describe("and i want to compile text through splain",() =>{
        Splain.addEntry({test:["works"]});
        expect(Splain.process("it {{test}}!")).toBe("it works!");
    })
});


