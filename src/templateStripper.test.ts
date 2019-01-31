import Config from "./config";
import TemplateStripper from "./templateStripper";

describe("when using the template stripper", () => {
    const defaultTokenConfig = new Config(),
        alternateTokenConfig = new Config().configure("templateTokens", {opening: "[[", closing: "]]"});

    it("it should be able to strip templates with default token config", () => {
        expect(TemplateStripper.stripTemplate("{{test template}}", defaultTokenConfig)).toBe("test template");
        expect(TemplateStripper.stripTemplate("{{test {{should not effect inner template }} template}}", defaultTokenConfig)).toBe("test {{should not effect inner template }} template");
    });

    it("it should be able to strip templates with alternate token config", () => {
        expect(TemplateStripper.stripTemplate("[[test template]]", alternateTokenConfig)).toBe("test template");
        expect(TemplateStripper.stripTemplate("[[test [[should not effect inner template ]] template]]", alternateTokenConfig)).toBe("test [[should not effect inner template ]] template");
    });

});
