import finder from "./templateFinder";

describe("when using the template finder", () =>{
    const testString = "Splain lets you {{adj.easy}} add some {{adj.fun}} dyamic options to you {{technology?5 | {{`work`|`project`}}}}";
    describe("and i want to find templates", ()=> {
        it("should find all Splain templates", () => {
            expect(finder.getTemplates(testString).length).toBe(3);
            expect(finder.getTemplates(testString)[0]).toBe("{{adj.easy}}");
            expect(finder.getTemplates(testString)[1]).toBe("{{adj.fun}}");
            expect(finder.getTemplates(testString)[2]).toBe("{{technology?5 | {{`work`|`project`}}}}");
        });
    });

    it("it should be able to strip templates",()=>{
        expect(finder.stripTemplate("{{test template}}")).toBe("test template");
        expect(finder.stripTemplate("{{test {{should not effect inner template }} template}}")).toBe("test {{should not effect inner template }} template");
    });

    describe("it should be able to detect a template", () => {
        it("should return results when there are templates" , () =>{
            expect(finder.containsTemplate("this {{containts}} a template")).not.toBeNull();
        });

        it("should return null when there are no templates" , () =>{
            expect(finder.containsTemplate("this {{containts a template")).toBeNull();
        });
    });

    describe("it should be able to find literals", ()=> {
        it("should return a 0 array with no literals", ()=>{
            expect(finder.getLiterals("no literals").length).toBe(0);
        });

        it("should return an array of literal", ()=>{
            expect(finder.getLiterals("`some` `literals`").length).toBe(2);
        });

        it("should not count broken literals", ()=>{
            expect(finder.getLiterals("`some` `broken `literals`").length).toBe(2);
        });
    });

    describe("it should be able to detect if a start and end falls within a given set of literals", ()=>{
        it("should return true when the given positions fall within a literal", ()=>{
            expect(finder.withinLiterals(5,6,[{start:4,end:8}])).toBe(true);
        });

        it("should return false when the given positions start falls outside a literal", ()=>{
            expect(finder.withinLiterals(2,6,[{start:4,end:8}])).toBe(false);
        });

        it("should return false when the given positions end falls outside a literal", ()=>{
            expect(finder.withinLiterals(5,10,[{start:4,end:8}])).toBe(false);
        });

        it("should not return true if it fals between different literal groups", ()=>{
            expect(finder.withinLiterals(5,11,[{start:4,end:8},{start:10,end:15}])).toBe(false);
        });
        it("should not return true if it fals between different literal groups", ()=>{
            expect(finder.withinLiterals(11,13,[{start:4,end:8},{start:10,end:15}])).toBe(true);
        });
    });
});
