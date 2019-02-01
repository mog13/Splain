import EntryProcessor from "./entryProcessor";
import Processor from "./processor";

describe("when I'm using the entry processor", () => {

    describe("and im processing contexts", () => {
        // We mock the processor has matching context function as that will be tested by processor.text
        const processor = new Processor();
        let entries = [];

        const blackEntry = {value: "black", context: ["night"]};
        const darkEntry = {value: "dark", context: ["night"]};
        const sunEntry = {value: "sun", context: ["day"]};
        const shadowEntry = {value: "shadow", context: ["night"]};
        const sundownEntry = {value: "sundown", context: ["dusk"]};
        const complexBlackEntry = {value: "black", context: {match: ["night"]}};
        const complexSunEntry = {value: "sun", context: {match: ["day"]}};

        describe("and i have matching contexts", () => {
            beforeEach(() => {
                processor.hasMatchingContext = (context) => (context.includes("night") || context.includes("dusk"));
                // processor = {
                //     hasMatchingContext: (context) => (context.includes("night") || context.includes("dusk")),
                // };
                entries = [blackEntry, darkEntry, sunEntry, shadowEntry, sundownEntry];
            });

            it("should return entries that have matching contexts according to the processor", () => {
                const results =  EntryProcessor.processContexts(entries, processor);
                expect(results.length).toBe(4);
                expect(results[0]).toBe(blackEntry);
                expect(results[1]).toBe(darkEntry);
                expect(results[2]).toBe(shadowEntry);
                expect(results[3]).toBe(sundownEntry);
            });

        });

        describe("and the contexts don't match anything", () => {
            beforeEach(() => {
                processor.hasMatchingContext = () => false;
                entries = [blackEntry, darkEntry, shadowEntry, sundownEntry];
            });

            it("should return entries that have matching contexts according to the processor", () => {
                const results =  EntryProcessor.processContexts(entries, processor);
                expect(results.length).toBe(4);
                expect(results[0]).toBe(blackEntry);
                expect(results[1]).toBe(darkEntry);
                expect(results[2]).toBe(shadowEntry);
                expect(results[3]).toBe(sundownEntry);
            });

        });

        describe("and i have complex contexts", () => {
            beforeEach(() => {
                processor.hasMatchingContext = (context) => (context.includes("night"));
                entries = [complexSunEntry, complexBlackEntry];
            });

            it("should return entries that have matching contexts according to the processor", () => {
                const results =  EntryProcessor.processContexts(entries, processor);
                expect(results.length).toBe(1);
                expect(results[0]).toBe(complexBlackEntry);
            });
        });

        describe("and i have a mix of contexts", () => {
            beforeEach(() => {
                processor.hasMatchingContext = (context) => (context.includes("night"));
                entries = [complexSunEntry, complexBlackEntry, sunEntry, blackEntry];
            });

            it("should return entries that have matching contexts according to the processor", () => {
                const results =  EntryProcessor.processContexts(entries, processor);
                expect(results.length).toBe(2);
                expect(results[0]).toBe(complexBlackEntry);
                expect(results[1]).toBe(blackEntry);
            });
        });

    });

    describe("and im processing weights", () => {
        it("should duplicate entries with weights the given amount", () => {
            const results =  EntryProcessor.processWeights(  ["test", {value: "trial", weight: 3}, "exam"]);
            expect(results.length).toBe(5);
            expect(results[0]).toBe("test");
            expect(results[1]).toBe("trial");
            expect(results[2]).toBe("trial");
            expect(results[3]).toBe("trial");
            expect(results[4]).toBe("exam");
        });
    });

});
