import SplainContext from "./splainContext";
import Dictionary from "./dictionary";

describe("with splain context", ()=> {
    let splainContext;

    beforeEach(() => {
        splainContext = new SplainContext(new Dictionary());
    });

    describe("when interacting with the cache", function () {
        let entry = ["red", "green", "blue"];
        beforeEach(() => {
            splainContext.addToCache("token.token", entry);
        });

        it("should get the entry from the populated cache if present", () => {
            expect(splainContext.getFromCache("token.token")).toBe(entry);
        });

        it("should not get the entry from the cache if not present", () => {
            expect(splainContext.getFromCache("token")).toBe(undefined);
        });

    });

    describe("when using fixed resolutions", function() {
        let fixedResolution = "red";
        beforeEach(() => {
            splainContext.addFixedResolution("token.token", fixedResolution);
        });

        it("should get the fixed resolution if present", () => {
            expect(splainContext.getFixedResolution("token.token")).toBe(fixedResolution);
        });

        it("should not get the fixed resolution if not present", () => {
            expect(splainContext.getFixedResolution("token")).toBe(undefined);
        });
    });

    describe("when resolving templates", function() {
        it("should set first resolution as value", () => {
            splainContext.addTemplateResolution("template", "resolution");
            expect(splainContext.templateResolutions["template"]).toBe("resolution");
        });

        it("should set second resolution into array of values", () => {
            splainContext.addTemplateResolution("template", "resolution1");
            splainContext.addTemplateResolution("template", "resolution1");
            expect(splainContext.templateResolutions["template"].length).toBe(2);
            expect(splainContext.templateResolutions["template"][0]).toBe("resolution1");
            expect(splainContext.templateResolutions["template"][1]).toBe("resolution1");
        });
    });

});