import processor from "./templateProcessor";
import SplainContext from "./SplainContext";

describe("when using the finder", () => {

    let splainContext = SplainContext.getDefault();

    describe("when finding all tokens", () => {
        let tokens = [];
        beforeEach(() => {
            tokens = processor.getTokens("`we`|`I` `think its ` super easy?3", splainContext);
        });

        it("should be able to find all the tokens", () =>{
            expect(tokens.length).toBe(10);
        });
    });

    describe("when finding the next token", () => {
        describe("and the token is a ?", () => {
            it("should identify a ?", () => {
                expect(processor.findNextToken("?345 ", splainContext).type).toBe("?");
            });

            it("should identify proceeding numbers", () => {
                expect(processor.findNextToken("?2345 ", splainContext).data).toBe("2345");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken("?2345 ", splainContext).raw).toBe("?2345");
            });

            it("should work when its the last token", () =>{
                expect(processor.findNextToken("?3", splainContext).raw).toBe("?3");
            });

            it("should default to 2 if no number is given",() => {
                expect(processor.findNextToken("? `test`", splainContext).data).toBe("2");
            });
        });

        describe("and the token is a |", () => {
            it("should identify a |", () => {
                expect(processor.findNextToken("|asggds", splainContext).type).toBe("|");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken("|adgaerhg", splainContext).raw).toBe("|");
            });
        });

        describe("and the token is a blank", () => {
            it("should identify a blank", () => {
                expect(processor.findNextToken(" this should be ignored", splainContext).type).toBe("blank");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken(" this should be ignored", splainContext).raw).toBe(" ");
            });

            it("should identify a new line as blank", () => {
                expect(processor.findNextToken("\nthis should be ignored", splainContext).raw).toBe("\n");
            });
        });

        describe("and the token is a literal (i.e quoted)", () => {
            it("should identify the type", () => {
                expect(processor.findNextToken("`test`|`test2", splainContext).type).toBe("lit");
            });

            it("should identify the literal", () => {
                expect(processor.findNextToken("`test`|`test2", splainContext).data).toBe("test");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken("`test`|`test2", splainContext).raw).toBe("`test`");
            });
        });

        describe("and the token is a splain target", () => {
            it("should identify the type", () => {
                expect(processor.findNextToken("morgan `this`|shouldn`t matter", splainContext).type).toBe("splain");
            });

            it("should identify the data", () => {
                expect(processor.findNextToken("morgan `this`|shouldn`t matter", splainContext).data).toBe("morgan");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken("morgan `this`|shouldn`t matter", splainContext).raw).toBe("morgan");
            });

        });

        describe("and the token is a variable target", () => {
            it("should identify the type", () => {
                expect(processor.findNextToken("##morgan `this`|shouldn`t matter", splainContext).type).toBe("variable");
            });

            it("should identify the data", () => {
                expect(processor.findNextToken("##morgan `this`|shouldn`t matter", splainContext).data).toBe("morgan");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken("##morgan `this`|shouldn`t matter", splainContext).raw).toBe("morgan");
            });

        });
    });
});
