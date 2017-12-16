import SplainToken from "./splainToken";
import SplainConfig from "./splainConfig";
import Dictionary from "./dictionary";
import SplainContext from "./splainContext";

describe("when I have a splain token", () => {

    describe("and want to convert a value with a contextual result", function () {
        let token = new SplainToken("splain", "test");

        it("should add a contextual result to the contexts", function () {
            let dictionary = new Dictionary();
            dictionary.addEntry({test: [{value:"test", context:"night"}]});
            let context = new SplainContext(dictionary, new SplainConfig());
            let result = token.convert(context);
            expect(result).toBe("test");
            expect(context.contexts.length).toBe(1);
            expect(context.contexts[0]).toBe("night");
        });
    });

    describe("and want to convert a value with a fixed resolution", function () {
        let token = new SplainToken("splain", "::test");

        it("should add a fixed result to the fixed resolutions", function () {
            let dictionary = new Dictionary();
            dictionary.addEntry({test: ["red"]});
            let context = new SplainContext(dictionary, new SplainConfig());
            let result = token.convert(context);
            expect(result).toBe("red");
            expect(context.fixedResolutions["test"]).toBe("red");
        });
    });

    describe("and we convert the value", function () {
        let token = new SplainToken("splain", "::test");

        it("should add the dictionary entry to the cache", function () {
            let dictionary = new Dictionary();
            let testVals = ["red"];
            dictionary.addEntry({test: testVals});
            let context = new SplainContext(dictionary, new SplainConfig());
            let result = token.convert(context);
            expect(result).toBe("red");
            expect(context.dictionaryCache["test"]).toBe(testVals);
        });
    });

});