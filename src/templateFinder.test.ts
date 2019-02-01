import SplainConfig from "./config";
import finder from "./templateFinder";

describe("when using the template finder", () => {
    const testString = "Splain lets you {{adj.easy}} add some {{adj.fun}} dyamic options to you {{technology?5 | {{`work`|`project`}}}}",
        testStringAlt = "Splain lets you [[adj.easy]] add some [[adj.fun]] dyamic options to you [[technology?5 | [[`work`|`project`]]]]",
        defaultTokenConfig =  new SplainConfig(),
        alternateTokenConfig = new SplainConfig().configure("templateTokens", {opening: "[[", closing: "]]"});

    describe("and i want to find templates with default token config", () => {
        it("should find all Splain templates", () => {
            expect(finder.getTemplates(testString, defaultTokenConfig).length).toBe(3);
            expect(finder.getTemplates(testString, defaultTokenConfig)[0]).toBe("{{adj.easy}}");
            expect(finder.getTemplates(testString, defaultTokenConfig)[1]).toBe("{{adj.fun}}");
            expect(finder.getTemplates(testString, defaultTokenConfig)[2]).toBe("{{technology?5 | {{`work`|`project`}}}}");
        });
    });

    describe("and i want to find templates with alternate token config", () => {
        it("should find all Splain templates", () => {
            expect(finder.getTemplates(testStringAlt, alternateTokenConfig).length).toBe(3);
            expect(finder.getTemplates(testStringAlt, alternateTokenConfig)[0]).toBe("[[adj.easy]]");
            expect(finder.getTemplates(testStringAlt, alternateTokenConfig)[1]).toBe("[[adj.fun]]");
            expect(finder.getTemplates(testStringAlt, alternateTokenConfig)[2]).toBe("[[technology?5 | [[`work`|`project`]]]]");
        });
    });

    describe("it should be able to detect a template with default token config", () => {
        it("should return results when there are templates" , () => {
            expect(finder.containsTemplate("this {{containts}} a template", defaultTokenConfig)).not.toBeNull();
        });

        it("should return null when there are no templates" , () => {
            expect(finder.containsTemplate("this {{containts a template", defaultTokenConfig)).toBeNull();
        });
    });

    describe("it should be able to detect a template with alternate token config", () => {
        it("should return results when there are templates" , () => {
            expect(finder.containsTemplate("this [[containts]] a template", alternateTokenConfig)).not.toBeNull();
        });

        it("should return null when there are no templates" , () => {
            expect(finder.containsTemplate("this {{containts a template", alternateTokenConfig)).toBeNull();
        });
    });

});
