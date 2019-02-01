import Processor from "./processor";

describe("with the processor", () => {
    let processor;

    beforeEach(() => {
        processor = new Processor();
    });

    describe("when i provide options in constructor", () => {
        beforeEach(() => {
            processor = new Processor(null, null, {test: "it works!", contexts: ["a", "b"]});
        });

        it("should add options that don't already exist", () => {
            expect(processor.test).toBe("it works!");
        });

        it("should override existing parameters", () => {
            expect(processor.contexts.length).toBe(2);
        });
    });

    describe("when I ask the processor for a result", () => {
        processor = new Processor();

        describe("and there is a result", () => {
            describe("and the result has no context", () => {
                let result;
                beforeEach(() => {
                    processor.dictionary.getProcessedEntry = () => ["test"];
                    processor.addContextWithPolicy = jasmine.createSpy("addContextWithPolicy");
                    result = processor.getResult("tokenPath");
                });

                it("should return the result", () => {
                    expect(result).toBe("test");
                });

                it("shouldn't of added any contexts", () => {
                    expect(processor.addContextWithPolicy).not.toHaveBeenCalled();
                });
            });
            describe("and the result has a  simple context", () => {
                let result;
                beforeEach(() => {
                    processor.dictionary.getProcessedEntry = () => [{value: "test", context: "a"}];
                    processor.addContextWithPolicy = jasmine.createSpy("addContextWithPolicy");
                    result = processor.getResult("tokenPath");
                });

                it("should return the result", () => {
                    expect(result).toBe("test");
                });

                it("should add selected context according to policy", () => {
                    expect(processor.addContextWithPolicy).toHaveBeenCalledWith("a");
                });
            });

            describe("and the result has a complex context", () => {
                let result;
                beforeEach(() => {
                    processor.dictionary.getProcessedEntry = () => [{value: "test", context: {match: ["a"], add: ["b", "c"]}}];
                    processor.addContextWithPolicy = jasmine.createSpy("addContextWithPolicy");
                    processor.addContext = jasmine.createSpy("addContext");
                    result = processor.getResult("tokenPath");
                });

                it("should return the result", () => {
                    expect(result).toBe("test");
                });

                it("should add matching context according to policy", () => {
                    expect(processor.addContextWithPolicy).toHaveBeenCalledWith(["a"]);
                });

                it("should add 'add' contexts ignoring policy", () => {
                    expect(processor.addContext).toHaveBeenCalledWith(["b", "c"]);
                });
            });
        });
    });

    describe("when using fixed resolutions", () => {
        const fixedResolution = "red";
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

        describe("and i have simple contexts", () => {
            describe("and i have conservative context matching on", () => {
                beforeEach(() => {
                    processor.config.contextMatcher = processor.config.contextMatchers.conservative;
                    processor.contexts = ["test"];
                    processor.addContextWithPolicy(["test2"]);
                });

                it("shouldn't add any new contexts", () => {
                    expect(processor.contexts.length).toBe(1);
                });
            });

            describe("and I have selective context matching on", () => {
                beforeEach(() => {
                    processor.config.contextMatcher = processor.config.contextMatchers.selective;
                    processor.contexts = ["test"];
                });
                describe("and it has a matching context", () => {
                    beforeEach(() => {
                        processor.addContextWithPolicy(["test", "test2"]);
                    });

                    it("shouldn't add any new contexts", () => {
                        expect(processor.contexts.length).toBe(1);
                    });
                });

                describe("and it doesn't have any matching contexts", () => {
                    beforeEach(() => {
                        processor.addContextWithPolicy(["test2", "test3"]);
                    });

                    it("should add a context at random", () => {
                        expect(processor.contexts.length).toBe(2);
                    });
                });

            });

            describe("and I have additive context matching on", () => {
                beforeEach(() => {
                    processor.config.contextMatcher = processor.config.contextMatchers.additive;
                    processor.contexts = ["test"];
                });
                describe("and it has a matching context", () => {
                    beforeEach(() => {
                        processor.addContextWithPolicy(["test", "test2"]);
                    });

                    it("shouldn't add any new contexts", () => {
                        expect(processor.contexts.length).toBe(1);
                    });
                });

                describe("and it doesn't have any matching contexts", () => {
                    beforeEach(() => {
                        processor.addContextWithPolicy(["test2", "test3"]);
                    });

                    it("should add a context at random", () => {
                        expect(processor.contexts.length).toBe(3);
                    });
                });

            });

            describe("and i add contexts ignoring policy", () => {
                beforeEach(() => {
                    processor.contexts = ["test"];
                    processor.addContext(["test", "test2", "test3"]);
                });

                it("should add a context at random", () => {
                    expect(processor.contexts.length).toBe(3);
                });
            });

            describe("and I duplicate contexts", () => {
                beforeEach(() => {
                    processor.contexts = ["a", "b"];
                    processor.addContextWithPolicy(["a", "b"]);
                    processor.addContextWithPolicy(["a", "b"]);
                });

                it("should add the value to the context", () => {
                    expect(processor.contexts.length).toBe(2);
                });
            });

        });
    });

    describe("when checking for matching context", () => {
        beforeEach(() => {
            processor.contexts = ["a", "b"];
        });

        it("should return true when the context already exists", () => {
            expect(processor.hasMatchingContext("a")).toBe(true);
        });

        it("should return false when the context doesn't exist", () => {
            expect(processor.hasMatchingContext("c")).toBe(false);
        });

        it("should return true when there are any matching contexts", () => {
            expect(processor.hasMatchingContext(["a", "c"])).toBe(true);
        });

        it("should return false when there are no matching contexts", () => {
            expect(processor.hasMatchingContext(["f", "l"])).toBe(false);
        });
    });

    describe("when resolving templates", () => {
        it("should set first resolution as value", () => {
            processor.addTemplateResolution("template", "resolution");
            expect(processor.templateResolutions.template[0]).toBe("resolution");
        });

        it("should set second resolution into array of values", () => {
            processor.addTemplateResolution("template", "resolution1");
            processor.addTemplateResolution("template", "resolution2");
            expect(processor.templateResolutions.template.length).toBe(2);
            expect(processor.templateResolutions.template[0]).toBe("resolution1");
            expect(processor.templateResolutions.template[1]).toBe("resolution2");
        });
    });

});
