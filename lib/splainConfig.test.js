import SplainConfig from "./splainConfig";

describe("when constructing splain config", ()=> {
    let splainConfig;

    beforeEach(() => {
        splainConfig = new SplainConfig();
    });

    it("should construct with defaults", () => {
        expect(splainConfig.keepTemplateOnUnmatched).toBe(true);
    });

    describe("when modifying the config", function () {

        beforeEach(() => {
            splainConfig.configure("keepTemplateOnUnmatched", false);
            splainConfig.configure("randomProperty", false);
        });

        it("should only write value key values", () => {
            expect(splainConfig.keepTemplateOnUnmatched).toBe(false);
            expect(splainConfig.randomProperty).toBe(undefined);
        });

    });

});
