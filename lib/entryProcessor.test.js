import EntryProcessor from "./entryProcessor";

describe("when I'm using the entry processor", () => {

    describe("and im processing contexts", () => {
        //We mock the processor has matching context function as that will be tested by processor.text
        let processor = {}, entries = [];

        let blackEntry = {value: "black", context: "night"};
        let darkEntry = {value: "dark", context: "night"};
        let sunEntry = {value: "sun", context: "day"};
        let shadowEntry = {value: "shadow", context: "night"};
        let sundownEntry = {value: "sundown", context: "dusk"};

        describe("and i have matching contexts", ()=>{
            beforeEach(() => {
                processor = {
                    hasMatchingContext: (context) => (context === "night" || context === "dusk")
                };
                entries = [blackEntry, darkEntry, sunEntry, shadowEntry, sundownEntry];
            });

            it("should return entries that have matching contexts according to the processor", function () {
                let results =  EntryProcessor.processContexts(entries,processor);
                expect(results.length).toBe(4);
                expect(results[0]).toBe(blackEntry);
                expect(results[1]).toBe(darkEntry);
                expect(results[2]).toBe(shadowEntry);
                expect(results[3]).toBe(sundownEntry);
            });

        });

        describe("and the contexts don't match anything", ()=>{
            beforeEach(() => {
                processor = {
                    hasMatchingContext: () => false
                };
                entries = [blackEntry, darkEntry, shadowEntry, sundownEntry];
            });

            it("should return entries that have matching contexts according to the processor", function () {
                let results =  EntryProcessor.processContexts(entries,processor);
                expect(results.length).toBe(4);
                expect(results[0]).toBe(blackEntry);
                expect(results[1]).toBe(darkEntry);
                expect(results[2]).toBe(shadowEntry);
                expect(results[3]).toBe(sundownEntry);
            });

        });



    });

    describe("and im processing weights", () => {
        it("should duplicate entries with weights the given amount", function () {
            let results =  EntryProcessor.processWeights(  ["test", {value: "trial", weight: 3}, "exam"]);
            expect(results.length).toBe(5);
            expect(results[0]).toBe("test");
            expect(results[1]).toBe("trial");
            expect(results[2]).toBe("trial");
            expect(results[3]).toBe("trial");
            expect(results[4]).toBe("exam");
        });
    });

});

