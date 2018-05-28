import Dictionary from "./dictionary";

describe("when I'm using a dictionary", () => {
    let dictionary;
    beforeEach(() => {
        dictionary = new Dictionary();
    });

    it("should have no entries by default", () => {
        expect(Object.keys(dictionary.entries).length).toBe(0);
    });

    describe("and i add an entry with a single root", () => {
        beforeEach(() => {
            dictionary.addEntry({testNames: ["test", "trial", "exam"]});
        });

        it("should have one entry", () => {
            expect(Object.keys(dictionary.entries).length).toBe(1);
        });

        it("should copy the entry structure", () => {
            expect(dictionary.entries["testNames"][0]).toBe("test");
            expect(dictionary.entries["testNames"][1]).toBe("trial");
            expect(dictionary.entries["testNames"][2]).toBe("exam");
        });

    });

    describe("and I add an entry with multiple roots", () => {
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

    describe("and I retrieve an entry", () => {
        beforeEach(() =>{
            dictionary.addEntry({world:{continents:{europe:{countries:["England","America","Russia"], currencies:["$"]}}}});
        });

        it("should return an entry if it exists", ()=> {
            expect(dictionary.getEntry("world.continents.europe.countries")[0]).toBe("England");
        });

        it("should return null if it doesn't exist", () =>{
            expect(dictionary.getEntry("this.doesnt.exist")).toBe(null);
        });

    });

});


