import Processor from "./processor";

describe("with the processor", () => {
    let processor;

    beforeEach(() => {
        processor = new Processor();
    });

    describe("when i provide options in constructor", () => {
        beforeEach(() => {
            processor = new Processor(null, null, {test: "it works!", contexts: ["a", "b"]})
        });

        it("should add options that don't already exist", () => {
            expect(processor.test).toBe("it works!");
        });

        it("should override existing parameters", () => {
            expect(processor.contexts.length).toBe(2);
        })
    });

    describe("when I ask the processor for a result", () => {
        processor = new Processor();

        describe("and there is a result", () => {
            describe("and the result has no context", () => {
                let result;
                beforeEach(() => {
                    processor.dictionary.getProcessedEntry = () => ["test"];
                    processor.addContext = jasmine.createSpy("addContext");
                    result = processor.getResult("tokenPath");
                });

                it("should return the result", () => {
                    expect(result).toBe("test");
                });

                it("shouldn't of added any contexts", () => {
                    expect(processor.addContext).not.toHaveBeenCalled();
                });
            });
            describe("and the result has a context", () => {
                let result;
                beforeEach(() => {
                    processor.dictionary.getProcessedEntry = () => [{value:"test","context":"a"}];
                    processor.addContext = jasmine.createSpy("addContext");
                    result = processor.getResult("tokenPath");
                });

                it("should return the result", () => {
                    expect(result).toBe("test");
                });

                it("shouldn't of added any contexts", () => {
                    expect(processor.addContext).toHaveBeenCalledWith("a");
                });
            });
        });
    });

    describe("when using fixed resolutions", () => {
        let fixedResolution = "red";
        beforeEach(() => {
            processor.addFixedResolution("token.token", fixedResolution);
        });

        it("should get the fixed resolution if present", () => {
            expect(processor.getFixedResolution("token.token")).toBe(fixedResolution);
        });

        it("should not get the fixed resolution if not present", () => {
            expect(processor.getFixedResolution("token")).toBe(undefined);
        });
    });


    describe("when adding a contexts", () => {
        describe("when there are no existing contexts", () => {

            describe("and i add a single context", () => {
                beforeEach(() => {
                    processor.addContext("context");
                });

                it("should add the value to the context", () => {
                    expect(processor.contexts.length).toBe(1);
                    expect(processor.contexts[0]).toBe("context");
                });
            });

            describe("and i add an array of contexts", () => {
                beforeEach(() => {
                    processor.addContext(["a", "b"]);
                });

                it("should add the value to the context", () => {
                    expect(processor.contexts.length).toBe(2);
                });
            });

            describe("and I duplicate contexts", () => {
                beforeEach(() => {
                    processor.addContext(["a", "b"]);
                    processor.addContext(["a", "b"]);
                    processor.addContext(["a", "b"]);
                });

                it("should add the value to the context", () => {
                    expect(processor.contexts.length).toBe(2);
                });
            })


        });

    });

    describe("when checking for matching context", ()=>{
        beforeEach(()=>{
            processor.addContext(["a", "b"]);
        });

        it("should return true when the context already exists", ()=>{
            expect(processor.hasMatchingContext("a")).toBe(true);
        });

        it("should return false when the context doesn't exist", ()=>{
            expect(processor.hasMatchingContext("c")).toBe(false);
        });

        it("should return true when there are any matching contexts", ()=>{
            expect(processor.hasMatchingContext(["a","c"])).toBe(true);
        });

        it("should return false when there are no matching contexts", ()=>{
            expect(processor.hasMatchingContext(["f","l"])).toBe(false);
        });
    });


    describe("when resolving templates", function () {
        it("should set first resolution as value", () => {
            processor.addTemplateResolution("template", "resolution");
            expect(processor.templateResolutions["template"][0]).toBe("resolution");
        });

        it("should set second resolution into array of values", () => {
            processor.addTemplateResolution("template", "resolution1");
            processor.addTemplateResolution("template", "resolution2");
            expect(processor.templateResolutions["template"].length).toBe(2);
            expect(processor.templateResolutions["template"][0]).toBe("resolution1");
            expect(processor.templateResolutions["template"][1]).toBe("resolution2");
        });
    });

});