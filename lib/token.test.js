import SplainToken from "./token";
import Splain from "./splain";
import finder from "./templateFinder";

describe("when I have a splain token and convert it", () => {
    let processInstance = {getResult: jasmine.createSpy('getResult')}, token;

    beforeEach(() => {
        processInstance.getResult.calls.reset();
    });

    describe("and its a splain token", () => {
        beforeEach(() => {
            token = new SplainToken("splain", "test", "");
            token.convert(processInstance);

        });

        it('should call the process instance to get an entry', function () {
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
                processInstance.addFixedResolution = jasmine.createSpy('addFixedResolution');
                token.convert(processInstance);
            });

            it('should call the process instance to get an entry', function () {
                expect(processInstance.getResult).toHaveBeenCalled();
            });

            it('should call the process instance to add the resolution', function () {
                expect(processInstance.addFixedResolution).toHaveBeenCalled();
            });
        });

        describe("and the token has a previous resolution", () => {
            let result;
            beforeEach(() => {
                processInstance.getFixedResolution = () => "test";
                processInstance.addFixedResolution = jasmine.createSpy('addFixedResolution');
                result = token.convert(processInstance);
            });

            it('should return the result of the fixed resolution lookup', function () {
                expect(result).toBe("test");
            });

            it('should call the process instance to get an entry', function () {
                expect(processInstance.getResult).not.toHaveBeenCalled();
            });

            it('should call the process instance to add the resolution', function () {
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
                processInstance.variables= {test: jasmine.createSpy("test")};
                token.convert(processInstance);
            });

            it('should call the provided function', function () {
                expect(processInstance.variables.test).toHaveBeenCalled();
            });
        });

        describe("and the variable isn't a function", () => {
            let result;
            beforeEach(() => {
                processInstance.variables= {test: "non-function"};
                result = token.convert(processInstance);
            });

            it('should call the provided function', function () {
                expect(result).toBe("non-function");
            });
        });

        describe("and the variable called doesn't exist", () => {
            describe("and the config is to keep templates on unmatched", () => {
                let result;
                beforeEach(() => {
                    processInstance.config = {keepTemplateOnUnmatched: true};
                    processInstance.variables = {};
                    result = token.convert(processInstance);
                });

                it("should return the token contents when converted", () => {
                    expect(result).toBe("test")
                });
            });

            describe("and the config is to not keep templates on unmatched", () => {
                let result;
                beforeEach(() => {
                    processInstance.config = {keepTemplateOnUnmatched: false};
                    processInstance.variables = {};
                    result = token.convert(processInstance);
                });

                it("should return the token contents when converted", () => {
                    expect(result).toBe(null)
                });
            });
        })

    });

    describe("and its a blank token", () => {
        let result;
        beforeEach(() => {
            token = new SplainToken("blank", "", "");
            result = token.convert(processInstance);
        });

        it('should return a space', function () {
            expect(result).toBe(" ");
        });
    });

    describe("and its a literal token", () => {
        let result;
        beforeEach(() => {
            token = new SplainToken("lit", "test", "");
            result = token.convert(processInstance);
        });

        it('should return the token data', function () {
            expect(result).toBe("test");
        });
    });

    describe("and its a template token", () => {
        let result;
        beforeEach(() => {
            token = new SplainToken("template", "", "");
            Splain.processTemplate = jasmine.createSpy("processTemplate");
            processInstance.config = {templateTokens: {opening:"{{",closing:"}}"}};
            finder.containsTemplate = ()=>false;
            result = token.convert(processInstance);
        });

        it('should return a space', function () {
            expect(Splain.processTemplate).toHaveBeenCalled();
        });
    });


    describe("and its an unknown type token", () => {
        let result;
        beforeEach(() => {
            token = new SplainToken("thisdoesntexist", "", "");
            result = token.convert(processInstance);
        });

        it('should return a space', function () {
            expect(result).toBeUndefined();
        });
    });


});