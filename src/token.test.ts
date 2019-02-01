import Config from "./config";
import Processor from "./processor";
import Splain from "./splain";
import finder from "./templateFinder";
import SplainToken from "./token";

describe("when using a token", () => {
    const processInstance = new Processor(), getResultSpy = jasmine.createSpy("getResult");
    let token;

    processInstance.getResult = getResultSpy;

    beforeEach(() => {
        // noinspection TypeScriptUnresolvedVariable
        getResultSpy.calls.reset();
    });

    describe("and its a splain token", () => {
        beforeEach(() => {
            token = new SplainToken("splain", "test", "");
            token.convert(processInstance);

        });

        it("should call the process instance to get an entry", () => {
            expect(processInstance.getResult).toHaveBeenCalled();

        });
    });

    describe("and its a fixed token", () => {
        beforeEach(() => {
            token = new SplainToken("fixed", "test", "");
        });

        describe("and the token has no previous resolution", () => {
            beforeEach(() => {
                processInstance.getFixedResolution = () => null;
                processInstance.addFixedResolution = jasmine.createSpy("addFixedResolution");
                token.convert(processInstance);
            });

            it("should call the process instance to get an entry", () => {
                expect(processInstance.getResult).toHaveBeenCalled();
            });

            it("should call the process instance to add the resolution", () => {
                expect(processInstance.addFixedResolution).toHaveBeenCalled();
            });
        });

        describe("and the token has a previous resolution", () => {
            let result;
            beforeEach(() => {
                processInstance.getFixedResolution = () => "test";
                processInstance.addFixedResolution = jasmine.createSpy("addFixedResolution");
                result = token.convert(processInstance);
            });

            it("should return the result of the fixed resolution lookup", () => {
                expect(result).toBe("test");
            });

            it("should call the process instance to get an entry", () => {
                expect(processInstance.getResult).not.toHaveBeenCalled();
            });

            it("should call the process instance to add the resolution", () => {
                expect(processInstance.addFixedResolution).not.toHaveBeenCalled();
            });
        });
    });

    describe("and its a variable token", () => {
        beforeEach(() => {
            token = new SplainToken("variable", "test", "##test");
        });

        describe("and the variable provided is a function", () => {
            beforeEach(() => {
                processInstance.variables = {test: jasmine.createSpy("test")};
                token.convert(processInstance);
            });

            it("should call the provided function", () => {
                expect(processInstance.variables.test).toHaveBeenCalled();
            });
        });

        describe("and the variable isn't a function", () => {
            let result;
            beforeEach(() => {
                processInstance.variables = {test: "non-function"};
                result = token.convert(processInstance);
            });

            it("should call the provided function", () => {
                expect(result).toBe("non-function");
            });
        });

        describe("and the variable called doesn't exist", () => {
            describe("and the config is to keep templates on unmatched", () => {
                let result;
                beforeEach(() => {
                    const newConfig = new Config();
                    newConfig.configure("keepTemplateOnUnmatched", true);
                    processInstance.config = newConfig;
                    processInstance.variables = {};
                    result = token.convert(processInstance);
                });

                it("should return the token contents when converted", () => {
                    expect(result).toBe("test");
                });
            });

            describe("and the config is to not keep templates on unmatched", () => {
                let result;
                beforeEach(() => {
                    const newConfig = new Config();
                    newConfig.configure("keepTemplateOnUnmatched", false);
                    processInstance.config = newConfig;
                    processInstance.variables = {};
                    result = token.convert(processInstance);
                });

                it("should return the token contents when converted", () => {
                    expect(result).toBe(null);
                });
            });
        });

    });

    describe("and its a blank token", () => {
        let result;
        beforeEach(() => {
            token = new SplainToken("blank", "", "");
            result = token.convert(processInstance);
        });

        it("should return a space", () => {
            expect(result).toBe(" ");
        });
    });

    describe("and its a literal token", () => {
        let result;
        beforeEach(() => {
            token = new SplainToken("lit", "test", "");
            result = token.convert(processInstance);
        });

        it("should return the token data", () => {
            expect(result).toBe("test");
        });
    });

    describe("and its a template token", () => {
        beforeEach(() => {
            token = new SplainToken("template", "", "");
            Splain.processTemplate = jasmine.createSpy("processTemplate");
            const newConfig = new Config();
            newConfig.configure("templateTokens", {opening: "{{", closing: "}}"});
            processInstance.config = newConfig;
            finder.containsTemplate = jasmine.createSpy("containsTemplate").and.returnValue(false);
            token.convert(processInstance);
        });

        it("should return a space", () => {
            expect(Splain.processTemplate).toHaveBeenCalled();
        });
    });

    describe("and its an unknown type token", () => {
        let result;
        beforeEach(() => {
            token = new SplainToken("thisdoesntexist", "", "");
            result = token.convert(processInstance);
        });

        it("should return a space", () => {
            expect(result).toBeUndefined();
        });
    });

});
