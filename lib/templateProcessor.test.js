import processor from "./templateProcessor";

describe("when using the template processor", () =>{
const testString = "Splain lets you {{adj.easy}} add some {{adj.fun}} dyamic options to you {{technology?5 | {{'work'|'project}}}}";
    describe("and i want to find templates", ()=> {
        it("should find all Splain templates", () => {
            expect(processor.getTemplates(testString).length).toBe(3);
            expect(processor.getTemplates(testString)[0]).toBe("{{adj.easy}}");
            expect(processor.getTemplates(testString)[1]).toBe("{{adj.fun}}");
            expect(processor.getTemplates(testString)[2]).toBe("{{technology?5 | {{'work'|'project}}}}");
        })
    });

    it("it should be able to strip templates",()=>{
        expect(processor.stripTemplate("{{test template}}")).toBe("test template");
        expect(processor.stripTemplate("{{test {{should not effect inner template }} template}}")).toBe("test {{should not effect inner template }} template");
    });

    describe("it should be able to detect a template", () => {
        it("should return results when there are templates" , () =>{
            expect(processor.containsTemplate("this {{containts}} a template")).not.toBeNull();
        });

        it("should return null when there are no templates" , () =>{
            expect(processor.containsTemplate("this {{containts a template")).toBeNull();
        });
    })
});
