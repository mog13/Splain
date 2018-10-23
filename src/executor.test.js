import executor from "./executor";

describe("when using the executor", () => {

    describe("and its executing conditionals (?) ", () => {

        it("should remove the conditional token in any scenario", () => {
            let tokens = [{type: "splain"}, {type: "?", data: "2"}];
            executor.executeConditionals(tokens);
            expect(tokens.length).not.toBe(2);
        });

        it("should remove the token if no compatible tokens exist", () => {
            let tokens = [{type: "?"}];
            executor.executeConditionals(tokens);
            expect(tokens.length).toBe(0);
        });
    });

    describe("and its executing ors (|)", () => {
        let tokens = [];
        beforeEach(() => {
            tokens = [{type: "splain"}, {type: "?"}, {type: "|"}, {type: "splain"}, {type: "?"}];
        });

        it("should remove the or and one side", () => {
            executor.executeOrs(tokens);
            expect(tokens.length).toBe(2);
        });

        it("should not execute if the token on the left side is null", () => {
            tokens = [{type: "|"}, {type: "splain"}, {type: "?"}];
            executor.executeOrs(tokens);
            expect(tokens.length).toBe(2);
        });

        it("should not execute if the token on the right side is null", () => {
            tokens = [{type: "splain"}, {type: "?"}, {type: "|"}];
            executor.executeOrs(tokens);
            expect(tokens.length).toBe(2);
        });

        it("should remove the token if no compatible tokens exist", () => {
            tokens = [{type: "|"}];
            executor.executeOrs(tokens);
            expect(tokens.length).toBe(0);
        });

        describe("and there are multiple or tokens", () => {
            beforeEach(() => {
                tokens = [{type: "splain"}, {type: "?"}, {type: "|"}, {type: "splain"}, {type: "?"}, {type: "|"}, {type: "splain"}, {type: "?"}];
            });

            it("should execute for both ors", () => {
                executor.executeOrs(tokens);
                expect(tokens.length).toBe(2);
            });
        });
    });

});