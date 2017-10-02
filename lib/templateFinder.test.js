import finder from "./templateFinder";

describe("when using the template finder", () =>{
const testString = "Splain lets you {{adj.easy}} add some {{adj.fun}} dyamic options to you {{technology?5 | {{`work`|`project`}}}}";
    describe("and i want to find templates", ()=> {
        it("should find all Splain templates", () => {
            expect(finder.getTemplates(testString).length).toBe(3);
            expect(finder.getTemplates(testString)[0]).toBe("{{adj.easy}}");
            expect(finder.getTemplates(testString)[1]).toBe("{{adj.fun}}");
            expect(finder.getTemplates(testString)[2]).toBe("{{technology?5 | {{`work`|`project`}}}}");
        })
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
    })
});
