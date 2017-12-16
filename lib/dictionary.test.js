import Dictionary from "./dictionary";

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
            expect(dictionary.getEntry("world.continents.europe.countries")[0]).toBe("England");
        });

        it("should return null if it doesn't exist (as explicit is true by default)", () =>{
            expect(dictionary.getEntry("this.doesnt.exist")).toBe(null);
        });

        it("should return the lowest entry it can find if not explicit", ()=>{
            expect(dictionary.getEntry("world.continents",false)).not.toBeNull();
        });
    });

    describe("and I add a dictionary with names and weights", () => {
        beforeEach(() =>{
            dictionary.addEntry({testNames: ["test", {value: "trial", weight: 3}, "exam"]});
        });

        it("should get the entries by their weights", () => {
            let entry = dictionary.getEntry("testNames");
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
            let entry = dictionary.getEntry("world.continents.europe.countries");
            expect(entry.length).toBe(5);
            expect(entry[0]).toBe("England");
            expect(entry[1]).toBe("America");
            expect(entry[2]).toBe("America");
            expect(entry[3]).toBe("America");
            expect(entry[4]).toBe("Russia");
        });
    });

    describe("and I add contextual entries to the dictionary that dont match the current contexts", () => {
        let blackEntry = {value:"black", context:"night"};
        let darkEntry = {value: "dark", context: "night"};
        beforeEach(() =>{
            dictionary.addEntry({testNames: [blackEntry, "bright", darkEntry, "light"]});
        });

        it("should get the contextual entries", () => {
            let entry = dictionary.getEntry("testNames", false, {contexts: ["day"]});
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

        it("should get the contextual entries", () => {
            let entry = dictionary.getEntry("testNames", false, {contexts: []});
            expect(entry.length).toBe(4);
            expect(entry[0]).toBe(blackEntry);
            expect(entry[1]).toBe("bright");
            expect(entry[2]).toBe(darkEntry);
            expect(entry[3]).toBe("light");
        });
    });
});


