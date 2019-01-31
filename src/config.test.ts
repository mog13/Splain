import SplainConfig from "./config";

describe("when using splain config", () => {
    let splainConfig;

    beforeEach(() => {
        splainConfig = new SplainConfig();
    });

    it("should construct with defaults", () => {
        expect(splainConfig.keepTemplateOnUnmatched).toBe(true);
    });

    describe("when modifying the config", () => {

        describe("when the property exists", () => {
            beforeEach(() => {
                splainConfig.configure("keepTemplateOnUnmatched", false);
            });

            it("should only write value key values", () => {
                expect(splainConfig.keepTemplateOnUnmatched).toBe(false);
            });

        });

        describe("when the property doesn't exists", () => {
            beforeEach(() => {
                splainConfig.configure("randomProperty", false);
            });

            it("should only write value key values", () => {
                expect(splainConfig.randomProperty).toBe(undefined);
            });

        });

    });

});
