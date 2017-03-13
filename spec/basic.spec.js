var Splain = require('../splain.js');


describe("when using the parser", () => {
    let splain, input;
    beforeEach(() => {
        input = "this is a {quantitive}{adj} test.";
        splain = new Splain();
    });

    it("should be able to trim the {} from the splain group", () => {
       expect(splain.$trimGroup("{this is a test}")).toBe("this is a test");
    });

    it("should be able to find splain groups", () => {
        expect(splain.$findGroups(input).length).toBe(2);
    });

    it("should be able to find inputs in a group", () => {
        let inputs = splain.$findInputs('input1 input2?|"test?"?');
        expect(inputs[0]).toBe("input1");
        expect(inputs[2]).toBe('"test?"');
        expect(inputs.length).toBe(3)
    });

    it("should be able to break it up into an array or variables and executions", () => {
       let execArray = splain.$getExecutionArray('input1 input2|"test"?');
        expect(execArray[0]).toBe("input1");
        expect(execArray[1]).toBe("input2");
        expect(execArray[2]).toBe("|");
        expect(execArray[3]).toBe('"test"');
        expect(execArray[4]).toBe("?");
    });

});