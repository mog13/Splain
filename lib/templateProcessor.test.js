import processor from "./templateProcessor";

describe("when using the processor", () => {

    describe("when finding all tokens", () => {
        let tokens = [];
        beforeEach(() => {
            tokens = processor.getTokens(`'we'|"I" "think its " super easy?3`);
        });

        it("should be able to find all the tokens", () =>{
            expect(tokens.length).toBe(10);
        })
    });

    describe("when finding the next token", () => {
        describe("and the token is a ?", () => {
            it("should identify a ?", () => {
                expect(processor.findNextToken("?345 ").type).toBe("?");
            });

            it("should identify proceeding numbers", () => {
                expect(processor.findNextToken("?2345 ").data).toBe("2345");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken("?2345 ").raw).toBe("?2345");
            });

            it("should work when its the last token", () =>{
                expect(processor.findNextToken("?3").raw).toBe("?3");
            })
        });

        describe("and the token is a |", () => {
            it("should identify a |", () => {
                expect(processor.findNextToken("|asggds").type).toBe("|");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken("|adgaerhg").raw).toBe("|");
            });
        });

        describe("and the token is a blank", () => {
            it("should identify a blank", () => {
                expect(processor.findNextToken(" this should be ignored").type).toBe("blank");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken(" this should be ignored").raw).toBe(" ");
            });

            it("should identify a new line as blank", () => {
                expect(processor.findNextToken("\nthis should be ignored").raw).toBe("\n");
            });
        });

        describe("and the token is a literal (i.e quoted)", () => {
            it("should identify the type", () => {
                expect(processor.findNextToken("'test'|'test2").type).toBe("lit");
            });

            it("should identify the literal", () => {
                expect(processor.findNextToken("'test'|'test2").data).toBe("test");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken("'test'|'test2").raw).toBe("'test'");
            });
        });

        describe("and the token is a splain target", () => {
            it("should identify the type", () => {
                expect(processor.findNextToken("morgan 'this'|shouldn't matter").type).toBe("splain");
            });

            it("should identify the data", () => {
                expect(processor.findNextToken("morgan 'this'|shouldn't matter").data).toBe("morgan");
            });

            it("should store the raw data", () => {
                expect(processor.findNextToken("morgan 'this'|shouldn't matter").raw).toBe("morgan");
            });

        })

    })
});
