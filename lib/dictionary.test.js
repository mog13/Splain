import Dictionary from "./dictionary";
import WeightedEntry from "./weightedEntry";

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
            dictionary.addEntry({testNames: ["test", new WeightedEntry("trial", 3), "exam"]});
        });

        it("should insert the entries by their weights", () => {
            let entry = dictionary.getEntry("testNames");
            let processWeights = dictionary.processWeights(entry);
            expect(processWeights.length).toBe(5);
            expect(processWeights[0]).toBe("test");
            expect(processWeights[1]).toBe("trial");
            expect(processWeights[2]).toBe("trial");
            expect(processWeights[3]).toBe("trial");
            expect(processWeights[4]).toBe("exam");
        });
    });

});


