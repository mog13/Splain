import splain from "./splain";

describe("when I use the splain object ", () => {
    let Splain;

    beforeEach(()=>{
        Splain = new splain();
    });

    it("should initialize with a default dictionary if none is specified", function () {
        expect(new splain().dictionaries.default).toBeDefined();
    });

    it("should use the given dictionary as default when initialized with one", function () {
        expect(new splain({hello:"world"}).dictionaries.default.entries.hello).toBe("world");
    });

    describe("and I add an entry", () =>{

        describe("and I don't provide specific dictionary", ()=>{
            beforeEach(()=>{
                Splain.addEntry({hello:"world"});
            });

            it("should use the default dictionary", ()=>{
                expect(new splain({hello:"world"}).dictionaries.default.entries.hello).toBe("world");
            });
        });

    });

    describe("and I add an entry", () =>{

        describe("and I don't provide specific dictionary", ()=>{
            beforeEach(()=>{
                Splain.addEntry({hello:"world"});
            });

            it("should use the default dictionary", ()=>{
                expect(new splain({hello:"world"}).dictionaries.default.entries.hello).toBe("world");
            });
        });

        describe("and specify the dictionary name", ()=>{
            beforeEach(()=>{
                Splain.addEntry({hello:"world"}, "test");
            });

            it("should use the 'test' dictionary", ()=>{
                expect(Splain.dictionaries.test.entries.hello).toBe("world");
            });

            it("should not add to the default dictionary", ()=>{
                expect(Splain.dictionaries.default.entries.hello).not.toBeDefined();
            });
        });

    });

});
