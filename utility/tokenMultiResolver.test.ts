import Dictionary from "../src/dictionary";
import TokenMultiResolver from "./tokenMultiResolver";

describe("when I'm using the dictionary verifier", () => {

    let dictionary;
    beforeEach(() => {
        dictionary = new Dictionary();
    });

    it("should be able to show options for a single template", () => {
        dictionary.addEntry({testNames: ["test", "exam"]});
        expect(TokenMultiResolver.processToken(dictionary, "{{testNames}}").length).toBe(2);
    });

    it("should be able to show options for a single template using JSON instead of dictionary object", () => {
        expect(TokenMultiResolver.processToken({testNames: ["test", "exam"]}, "{{testNames}}").length).toBe(2);
    });

    it("should be able to permeate between multiple options ", () => {
        expect(TokenMultiResolver.processToken({
            suits: ["H", "C", "S", "D"],
            vals: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",]
        }, "{{vals `of` suits}}").length).toBe(13 * 4);
    });

    it("should be able to permeate between multiple options and recursively compile templates", () => {
        expect(TokenMultiResolver.processToken({
            suits: ["{{black}}","{{red}}"],
            black:["S","C"],
            red:["H","D"],
            vals: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",]
        }, "{{vals `of` suits}}").length).toBe(13 * 4);
    });

    it("should work on large dictionary sets", () => {
        let dict = {
            loading: {
                message: ["{{loading.prefix loading.content loading.suffix}}"],
                content: ["{{loading.verb loading.media}}", "signing in"],
                prefix: ["currently ", "please hold ", "skipping "],
                suffix: [", this is the tricky part!", "...not much longer now", "and failing"],
                media: ["assets", "images", "effects", "music"],
                verb: ["loading", "compiling", "extracting"]
            }

        };
        expect(TokenMultiResolver.processToken(dict,"{{loading.message}}").length).toBe(117);

    });


});