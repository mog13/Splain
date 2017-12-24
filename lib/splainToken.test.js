import SplainToken from "./splainToken";
import SplainConfig from "./splainConfig";
import Dictionary from "./dictionary";
import SplainContext from "./splainContext";

describe("when I have a splain token", () => {

    describe("and want to convert a value with a contextual result", () => {
        let token = new SplainToken("splain", "test");

        it("should add a contextual result to the contexts", () => {
            let dictionary = new Dictionary();
            dictionary.addEntry({test: [{value:"test", context:"night"}]});
            let context = new SplainContext(dictionary, new SplainConfig());
            let result = token.convert(context);
            expect(result).toBe("test");
            expect(context.contexts.length).toBe(1);
            expect(context.contexts[0]).toBe("night");
        });
    });

    describe("and want to convert a value with a fixed resolution", () => {
        let token = new SplainToken("fixed", "::test");

        it("should add a fixed result to the fixed resolutions", () => {
            let dictionary = new Dictionary();
            dictionary.addEntry({test: ["red"]});
            let context = new SplainContext(dictionary, new SplainConfig());
            let result = token.convert(context);
            expect(result).toBe("red");
            expect(context.fixedResolutions["test"]).toBe("red");
        });
    });

    describe("and we convert the value", () => {
        let token = new SplainToken("fixed", "::test");

        it("should add the dictionary entry to the cache", () => {
            let dictionary = new Dictionary();
            let testVals = ["red"];
            dictionary.addEntry({test: testVals});
            let context = new SplainContext(dictionary, new SplainConfig());
            let result = token.convert(context);
            expect(result).toBe("red");
            expect(context.dictionaryCache["test"]).toBe(testVals);
        });
    });
    
    describe("and want to convert a variable value", () => {

        it("should convert a function variable", () => {
            let token = new SplainToken("variable", "##test");
            let context = new SplainContext(new Dictionary(), new SplainConfig());
            function varTest() {
                return "tester";
            }
            context.variables = {
                test: () => varTest()
            };
            expect(token.convert(context)).toBe("tester");
        });

        it("should convert a non function variable", () => {
            let token = new SplainToken("variable", "##test");
            let context = new SplainContext(new Dictionary(), new SplainConfig());
            context.variables = {
                test: "tester"
            };
            expect(token.convert(context)).toBe("tester");
        });

        it("should convert return data when configures and no match", () => {
            let token = new SplainToken("variable", "##abc");
            let context = new SplainContext(new Dictionary(), new SplainConfig());
            context.variables = {
                test: () => "tester"
            };
            expect(token.convert(context)).toBe("abc");
        });
    });

});