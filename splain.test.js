require("./splain");

describe("when i import the splain library", ()=> {

    it("should expose a splain object on the window", () =>{
        expect(Splain).toBeDefined();
    });

    it("should by default have a dictionary object", () =>{
        expect(Splain.dictionary).toBeDefined();
    });

    it("should populate default dicitionaries", () => {
       expect(Splain.dictionary.getEntry("weather")).not.toBeNull()
    });
});


