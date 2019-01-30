import Dictionary from "../src/dictionary";
import TokenMultiResolver from "./tokenMultiResolver";

describe("when I'm using the dictionary verifier", () => {

    let dictionary;
    beforeEach(() => {
        dictionary = new Dictionary();
    });

    it("should return each entry in a dictionary entry that only contains literals etc", () => {
        dictionary.addEntry({testNames: ["test", "exam"]});
        expect(TokenMultiResolver.processToken(dictionary,"{{testNames}}").length).toBe(2);
    });

    it("should return each entry in a json entry that only contains literals etc", () => {
        expect(TokenMultiResolver.processToken({testNames: ["test", "exam"]},"{{testNames}}").length).toBe(2);
    });


    it("should return each entry in a json entry that only contains literals etc larger data set", () => {
        expect(TokenMultiResolver.processToken({suits:["H","C","S","D"],vals:["A","2","3","4","5","6","7","8","9","10","J","Q","K",]},"{{vals `of` suits}}").length).toBe(13*4);
    });


});