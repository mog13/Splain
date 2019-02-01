import Config from "./config";
import TokenFinder from "./tokenFinder";

describe("when using the token finder", () => {
    const defaultTokenConfig = new Config();

    describe("and i want to find all tokens", () => {
        let tokens = [];
        beforeEach(() => {
            tokens = TokenFinder.getTokens("`we`|`I` `think its ` super easy?3", defaultTokenConfig);
        });

        it("should be able to find all the tokens", () => {
            expect(tokens.length).toBe(10);
        });
    });

    describe("and allt he tokens cant be found before panic threshold", () => {
        let tokens = [];
        beforeEach(() => {
            tokens = TokenFinder.getTokens("`we`|`I` `think its ` super easy?3",  new Config().configure("panicThreshold", 1));
        });

        it("should stop processing after the panic threshold", () => {
            expect(tokens.length).toBe(1);
        });
    });

    describe("when i look for the next token", () => {

        describe("and the token is a template", () => {
            describe("and the template is formed correctly", () => {
                it("should identify it as a template", () => {
                    expect(TokenFinder.findNextToken("{{test}} ", defaultTokenConfig).type).toBe("template");
                });

                it("should identify the contents of the template", () => {
                    expect(TokenFinder.findNextToken("{{test}}", defaultTokenConfig).data).toBe("test");
                });

                it("should store the raw data", () => {
                    expect(TokenFinder.findNextToken("{{test}}", defaultTokenConfig).raw).toBe("{{test}}");
                });
            });

            describe("and the template is malformed", () => {
                it("should throw a warning", () => {
                    expect(() => TokenFinder.findNextToken("{{test", defaultTokenConfig)).toThrow();
                });
            });

        });

        describe("and the token is a ?", () => {
            it("should identify a ?", () => {
                expect(TokenFinder.findNextToken("?345 ", defaultTokenConfig).type).toBe("?");
            });

            it("should identify proceeding numbers", () => {
                expect(TokenFinder.findNextToken("?2345 ", defaultTokenConfig).data).toBe("2345");
            });

            it("should store the raw data", () => {
                expect(TokenFinder.findNextToken("?2345 ", defaultTokenConfig).raw).toBe("?2345");
            });

            it("should work when its the last token", () => {
                expect(TokenFinder.findNextToken("?3", defaultTokenConfig).raw).toBe("?3");
            });

            it("should default to 2 if no number is given", () => {
                expect(TokenFinder.findNextToken("? `test`", defaultTokenConfig).data).toBe("2");
            });
        });

        describe("and the token is a |", () => {
            it("should identify a |", () => {
                expect(TokenFinder.findNextToken("|asggds", defaultTokenConfig ).type).toBe("|");
            });

            it("should store the raw data", () => {
                expect(TokenFinder.findNextToken("|adgaerhg", defaultTokenConfig ).raw).toBe("|");
            });
        });

        describe("and the token is a blank", () => {
            it("should identify a blank", () => {
                expect(TokenFinder.findNextToken(" this should be ignored", defaultTokenConfig ).type).toBe("blank");
            });

            it("should store the raw data", () => {
                expect(TokenFinder.findNextToken(" this should be ignored", defaultTokenConfig ).raw).toBe(" ");
            });

            it("should identify a new line as blank", () => {
                expect(TokenFinder.findNextToken("\nthis should be ignored", defaultTokenConfig ).raw).toBe("\n");
            });
        });

        describe("and the token is a literal (i.e quoted)", () => {
            it("should identify the type", () => {
                expect(TokenFinder.findNextToken("`test`|`test2", defaultTokenConfig ).type).toBe("lit");
            });

            it("should identify the literal", () => {
                expect(TokenFinder.findNextToken("`test`|`test2", defaultTokenConfig ).data).toBe("test");
            });

            it("should store the raw data", () => {
                expect(TokenFinder.findNextToken("`test`|`test2", defaultTokenConfig ).raw).toBe("`test`");
            });
        });

        describe("and the token is a splain target", () => {
            it("should identify the type", () => {
                expect(TokenFinder.findNextToken("morgan `this`|shouldn`t matter", defaultTokenConfig ).type).toBe("splain");
            });

            it("should identify the data", () => {
                expect(TokenFinder.findNextToken("morgan `this`|shouldn`t matter", defaultTokenConfig ).data).toBe("morgan");
            });

            it("should store the raw data", () => {
                expect(TokenFinder.findNextToken("morgan `this`|shouldn`t matter", defaultTokenConfig ).raw).toBe("morgan");
            });

        });

        describe("and the token is a variable target", () => {
            it("should identify the type", () => {
                expect(TokenFinder.findNextToken("##morgan `this`|shouldn`t matter", defaultTokenConfig ).type).toBe("variable");
            });

            it("should identify the data", () => {
                expect(TokenFinder.findNextToken("##morgan `this`|shouldn`t matter", defaultTokenConfig ).data).toBe("morgan");
            });

            it("should store the raw data", () => {
                expect(TokenFinder.findNextToken("##morgan `this`|shouldn`t matter", defaultTokenConfig ).raw).toBe("##morgan");
            });

        });

        describe("and the token is a fixed resolution", () => {
            it("should identify the type", () => {
                expect(TokenFinder.findNextToken("::test this", defaultTokenConfig ).type).toBe("fixed");
            });

            it("should identify the data", () => {
                expect(TokenFinder.findNextToken("::test this", defaultTokenConfig ).data).toBe("test");
            });

            it("should store the raw data", () => {
                expect(TokenFinder.findNextToken("::test this", defaultTokenConfig ).raw).toBe("::test");
            });

        });

    });

    describe("and i want to find the first preceding token of any of the given types", () => {
        let tokens;
        beforeEach(() => {
            tokens = [{type: "?"}, {type: "|"}, {type: "splain"}];
        });

        it("should be able to find oen specific type", () => {
            expect(TokenFinder.getPrecedingTokenOfType(["?"], tokens, 2)).toBe(0);
        });
        it("should return null if there are no tokens", () => {
            expect(TokenFinder.getPrecedingTokenOfType(["made up"], tokens, 2)).toBe(null);
        });
        it("should not match itself", () => {
            expect(TokenFinder.getPrecedingTokenOfType(["splain"], tokens, 2)).toBe(null);
        });
    });

    describe("and i want to find the first proceeding token of any of the given types", () => {
        let tokens;
        beforeEach(() => {
            tokens = [{type: "?"}, {type: "|"}, {type: "splain"}];
        });

        it("should be able to find oen specific type", () => {
            expect(TokenFinder.getProceedingTokenOfType(["splain"], tokens, 0)).toBe(2);
        });
        it("should return null if there are no tokens", () => {
            expect(TokenFinder.getProceedingTokenOfType(["made up"], tokens, 1)).toBe(null);
        });
        it("should not match itself", () => {
            expect(TokenFinder.getProceedingTokenOfType(["?"], tokens, 0)).toBe(null);
        });
    });

    describe("and i want to find the first token of a given tye", () => {
        let tokens;

        beforeEach(() => {
            tokens = [{type: "?"}, {type: "|"}, {type: "splain"}];
        });

        it("should return the index of the first ? token", () => {
            expect(TokenFinder.findFirstTokenOfType("?", tokens)).toBe(0);
        });

        it("should return the index of the first splain token", () => {
            expect(TokenFinder.findFirstTokenOfType("splain", tokens)).toBe(2);
        });

        // it("should return null if there is no token for the given type", () => {
        //     expect(TokenFinder.findFirstTokenOfType("made up", tokens)).toBeNull();
        // });
    });

});
