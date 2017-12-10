import WeightedEntry from "./weightedEntry";

describe("when using a weighted entry", ()=> {

    it("should get the weighted values", () => {
        let weightedEntry = new WeightedEntry("test", 3);
        let weightedValues = weightedEntry.getWeightedValues();
        expect(weightedValues.length).toBe(3);
        expect(weightedValues[0]).toBe("test");
        expect(weightedValues[1]).toBe("test");
        expect(weightedValues[2]).toBe("test");
    });

});