import Dictionary from "./dictionary";
import SplainContext from "./splainContext";

describe("when I'm using a dictionary", () => {
    let dictionary;
    beforeEach(() => {
        dictionary = new Dictionary();
    });

    it("should have no entries by default", () => {
        expect(Object.keys(dictionary.entries).length).toBe(0);
    });

    describe("and i add a dictionary with a given name", () => {
        beforeEach(() => {
            dictionary.addEntry({testNames: ["test", "trial", "exam"]}, "test");
        });

        it("should have one entry", () => {
            expect(Object.keys(dictionary.entries).length).toBe(1);
        });

        it("should use the name given for the entry", () => {
            expect(dictionary.entries["test"]).toBeDefined();
        });

    });

    describe("and i add a dictionary with a no name but a single root", () => {
        beforeEach(() => {
            dictionary.addEntry({testNames: ["test", "trial", "exam"]});
        });

        it("should have one entry", () => {
            expect(Object.keys(dictionary.entries).length).toBe(1);
        });

        it("should use the given root for the entry name and shift it a level up", () => {
            expect(dictionary.entries["testNames"][0]).toBe("test");
            expect(dictionary.entries["testNames"][1]).toBe("trial");
            expect(dictionary.entries["testNames"][2]).toBe("exam");
        });

    });

    describe("and a add a dictionary with no name and multiple roots", () => {
        beforeEach(() => {
            dictionary.addEntry({testNames: ["test", "trial", "exam"], otherTestNames: {words:["test"]}});
        });

        it("should have multiple entries", () => {
            expect(Object.keys(dictionary.entries).length).toBe(2);
        });

        it("should use each root as a new entry",() =>{
            expect(dictionary.entries["testNames"][0]).toBe("test");
            expect(dictionary.entries.otherTestNames.words[0]).toBe("test");
        });
    });

    describe("and I want to retrieve a dictionary", () => {
        beforeEach(() =>{
            dictionary.addEntry({world:{continents:{europe:{countries:["England","America","Russia"], currencies:["$"]}}}});
        });

        it("should return an entry if it exists", ()=> {
            expect(dictionary.getEntry("world.continents.europe.countries", false, SplainContext.getDefault())[0]).toBe("England");
        });

        it("should return null if it doesn't exist (as explicit is true by default)", () =>{
            expect(dictionary.getEntry("this.doesnt.exist", true, SplainContext.getDefault())).toBe(null);
        });

        it("should return the lowest entry it can find if not explicit", ()=>{
            expect(dictionary.getEntry("world.continents", false, SplainContext.getDefault())).not.toBeNull();
        });
    });

    describe("and I add a dictionary with names and weights", () => {
        beforeEach(() =>{
            dictionary.addEntry({testNames: ["test", {value: "trial", weight: 3}, "exam"]});
        });

        it("should get the entries by their weights", () => {
            let entry = dictionary.getEntry("testNames", false, SplainContext.getDefault());
            expect(entry.length).toBe(5);
            expect(entry[0]).toBe("test");
            expect(entry[1]).toBe("trial");
            expect(entry[2]).toBe("trial");
            expect(entry[3]).toBe("trial");
            expect(entry[4]).toBe("exam");
        });
    });

    describe("and I add a dictionary with names and weights nested object", () => {
        beforeEach(() =>{
            dictionary.addEntry({world:{continents:{europe:{countries:["England",{value: "America", weight: 3},"Russia"], currencies:["$"]}}}});
        });

        it("should get the entries by their weights", () => {
            let entry = dictionary.getEntry("world.continents.europe.countries", false, SplainContext.getDefault());
            expect(entry.length).toBe(5);
            expect(entry[0]).toBe("England");
            expect(entry[1]).toBe("America");
            expect(entry[2]).toBe("America");
            expect(entry[3]).toBe("America");
            expect(entry[4]).toBe("Russia");
        });
    });

    describe("should return contextual entries", () => {
        let blackEntry = {value:"black", context:"night"};
        let darkEntry = {value:"dark", context:"night"};
        let sunEntry = {value:"sun", context:"day"};
        let shadowEntry = {value:"shadow", context:"night"};
        let sundownEntry = {value:"sundown", context:"dusk"};
        let entries = [
            blackEntry,
            darkEntry,
            sunEntry,
            shadowEntry,
            sundownEntry
        ];
        let context = SplainContext.getDefault();
        context["contexts"] = ["night", "dusk"];

        let result = new Dictionary().processContexts(entries, context);
        expect(result.length).toBe(4);
        expect(result[0]).toBe(blackEntry);
        expect(result[1]).toBe(darkEntry);
        expect(result[2]).toBe(shadowEntry);
        expect(result[3]).toBe(sundownEntry);
    });

    describe("should return contextual array", () => {
        let blackEntry = {value:"black", context:["dark", "dusk"]};
        let darkEntry = {value:"dark", context:"night"};
        let sunEntry = {value:"sun", context:"day"};
        let entries = [
            blackEntry,
            darkEntry,
            sunEntry
        ];
        let context = SplainContext.getDefault();
        context["contexts"] = ["night", "dusk"];

        let result = new Dictionary().processContexts(entries, context);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(blackEntry);
        expect(result[1]).toBe(darkEntry);
    });

    describe("and I add contextual entries to the dictionary that dont match the current contexts", () => {
        let blackEntry = {value:"black", context:"night"};
        let darkEntry = {value: "dark", context: "night"};
        beforeEach(() =>{
            dictionary.addEntry({testNames: [blackEntry, "bright", darkEntry, "light"]});
        });
        let context = SplainContext.getDefault();
        context["contexts"] = ["day", "dusk"];

        it("should get the contextual entries", () => {
            let entry = dictionary.getEntry("testNames", false, context);
            expect(entry.length).toBe(4);
            expect(entry[0]).toBe(blackEntry);
            expect(entry[1]).toBe("bright");
            expect(entry[2]).toBe(darkEntry);
            expect(entry[3]).toBe("light");
        });
    });

    describe("and I add contextual entries to the dictionary that don't match the empty current contexts", () => {
        let blackEntry = {value:"black", context:"night"};
        let darkEntry = {value: "dark", context: "night"};
        beforeEach(() =>{
            dictionary.addEntry({testNames: [blackEntry, "bright", darkEntry, "light"]});
        });
        let context = SplainContext.getDefault();

        it("should get the contextual entries", () => {
            let entry = dictionary.getEntry("testNames", false, context);
            expect(entry.length).toBe(4);
            expect(entry[0]).toBe(blackEntry);
            expect(entry[1]).toBe("bright");
            expect(entry[2]).toBe(darkEntry);
            expect(entry[3]).toBe("light");
        });
    });

    describe("when adding a contextual entry to the dictionary without name", () => {
        beforeEach(() => {
            dictionary.addEntry({testNames: ["test"]}, null, "EN");
        });

        it("should have one entry", () => {
            expect(Object.keys(dictionary.entries["EN"]).length).toBe(1);
        });

        it("should use the name given for the entry", () => {
            expect(dictionary.entries["EN"]["testNames"]).toBeDefined();
        });
    });

    describe("when adding a contextual entry to the dictionary eith given name", () => {
        beforeEach(() => {
            dictionary.addEntry({testNames: ["test"]}, "test", "EN");
        });

        it("should have one entry", () => {
            expect(Object.keys(dictionary.entries["EN"]).length).toBe(1);
        });

        it("should use the name given for the entry", () => {
            expect(dictionary.entries["EN"]["test"]).toBeDefined();
        });
    });
});


