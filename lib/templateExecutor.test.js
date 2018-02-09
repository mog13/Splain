import executor from "./templateExecutor";
describe("when using the template executor", ()=> {

    describe("and its executing conditionals (?) ", () => {
        let tokens = [];
        beforeEach(()=> {
            tokens = [{type:"splain"},{type:"?",data:"2"}];
        });

        it("should conditionally remove them", () =>{
            let results = {remain:0,removed:0};
            for(let i =0; i <50 ;i++){
                tokens = [{type:"splain"},{type:"?",data:"2"}];
                executor.executeConditionals(tokens);
                expect(tokens.length).not.toBe(2);
                if(tokens.length ===0) results.removed ++;
                else results.remain ++;
            }
            expect(results.remain).toBeGreaterThan(0);
            expect(results.removed).toBeGreaterThan(0);
        });

        it("should remove the token if no compatible tokens exist", () => {
            tokens = [{type:"?"}];
            executor.executeConditionals(tokens);
            expect(tokens.length).toBe(0);
        });
    });

    describe("and its executing ors (|)", ()=> {
        let tokens = [];
        beforeEach(()=> {
            tokens = [{type:"splain"},{type:"?"},{type:"|"},{type:"splain"},{type:"?"}];
        });

        it("should remove the or and one side", () =>{
            executor.executeOrs(tokens);
            expect(tokens.length).toBe(2);
        });

        it("should not execute if the token on the left side is null", () =>{
            tokens = [{type:"|"},{type:"splain"},{type:"?"}];
            executor.executeOrs(tokens);
            expect(tokens.length).toBe(2);
        });

        it("should not execute if the token on the right side is null", () =>{
            tokens = [{type:"splain"},{type:"?"},{type:"|"}];
            executor.executeOrs(tokens);
            expect(tokens.length).toBe(2);
        });

        it("should remove the token if no compatible tokens exist", () =>{
            tokens = [{type:"|"}];
            executor.executeOrs(tokens);
            expect(tokens.length).toBe(0);
        });

        describe("and there are multiple or tokens", ()=> {
            beforeEach(()=> {
                tokens = [{type:"splain"},{type:"?"},{type:"|"},{type:"splain"},{type:"?"},{type:"|"},{type:"splain"},{type:"?"}];
            });

            it("should execute for both ors", () =>{
                executor.executeOrs(tokens);
                expect(tokens.length).toBe(2);
            });
        });
    });


    describe("and i want to find the first preceeding token of any of the given types", ()=> {
        let tokens;
        beforeEach(()=> {
            tokens = [{type:"?"},{type:"|"},{type:"splain"}];
        });

        it("should be able to find oen specific type", () =>{
            expect(executor.getPreceedingTokenOfType(["?"],tokens,2)).toBe(0);
        });
        it("should return null if there are no tokens", () =>{
            expect(executor.getPreceedingTokenOfType(["made up"],tokens,2)).toBe(null);
        });
        it("should not match itself", () =>{
            expect(executor.getPreceedingTokenOfType(["splain"],tokens,2)).toBe(null);
        });
    });

    describe("and i want to find the first proceeding token of any of the given types", ()=> {
        let tokens;
        beforeEach(()=> {
            tokens = [{type:"?"},{type:"|"},{type:"splain"}];
        });

        it("should be able to find oen specific type", () =>{
            expect(executor.getProceedingTokenOfType(["splain"],tokens,0)).toBe(2);
        });
        it("should return null if there are no tokens", () =>{
            expect(executor.getProceedingTokenOfType(["made up"],tokens,1)).toBe(null);
        });
        it("should not match itself", () =>{
            expect(executor.getProceedingTokenOfType(["?"],tokens,0)).toBe(null);
        });
    });

    describe("and i want to find the first token of a given tye", ()=> {
        let tokens;

        beforeEach(()=> {
            tokens = [{type:"?"},{type:"|"},{type:"splain"}];
        });

        it("should return the index of the first ? token", () => {
            expect(executor.findFirstTokenOfType("?", tokens)).toBe(0);
        });

        it("should return the index of the first splain token", () => {
            expect(executor.findFirstTokenOfType("splain", tokens)).toBe(2);
        });

        it("should return null if there is no token for the given type", () => {
            expect(executor.findFirstTokenOfType("made up", tokens)).toBeNull();
        });
    });
});