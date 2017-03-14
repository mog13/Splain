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
       let execArray = splain.$getExecutionArray('input1 input2|"test"?4');
        expect(execArray[0].value).toBe("input1");
        expect(execArray[1].value).toBe("input2");
        expect(execArray[2].value).toBe("|");
        expect(execArray[3].value).toBe('"test"');
        expect(execArray[4].value).toBe("?4");
    });

    describe("when dealing with execution arrays", () => {

        it("should be able to find the nearest input going left", () => {
            let execArray = splain.$getExecutionArray('input1 input2 input3|"test"');
            expect(splain.$getNearestInputLeft(execArray, 2)).toBe(1)
        });

        it("should return -1 if no input is found left", () => {
            let execArray = splain.$getExecutionArray('?input1 input2 input3|"test"');
            expect(splain.$getNearestInputLeft(execArray, 1)).toBe(-1)
        });

        it("should be able to find the nearest input going right", () => {
            let execArray = splain.$getExecutionArray('input1 input2? input3|"test"');
            expect(splain.$getNearestInputRight(execArray, 1)).toBe(3)
        });


        it("should return -1 if no input is found right", () => {
            let execArray = splain.$getExecutionArray('input1 input2? input3|"test"');
            expect(splain.$getNearestInputRight(execArray, 5)).toBe(-1)
        });


        it("should be able to process ors", () => {
            let execArray = splain.$getExecutionArray('input1 input2|"test"');
            splain.$processOrOperators(execArray);
            expect(execArray.length).toBe(2);
        });


    });

    it("should be able to add a templateSet to splain", () => {
       splain.addTemplate("example", [1,2,3,4]);
        expect(splain.getTemplate("example")[0]).toBe(1);
        expect(splain.getTemplate("example")[3]).toBe(4);
    });

    it("should be able to return if there are only inputs", () => {
        let input= [{type:"input"},{type:"input"},{type:"input"}];
        expect(splain.$containsOnlyInputs(input)).toBe(true);
    });

    it("should be able to return if there are other types", () => {
        let input= [{type:"input"},{type:"|"},{type:"input"}];
        expect(splain.$containsOnlyInputs(input)).toBe(false);
    });

    it("should be able to compile a template", () => {
        splain.addTemplate("example", [1]);
        expect(splain.$processInputs([{value:"example",type:"input"}])[0].value).toBe(1);
    });

    it("Should be able to compile a whole splain group", () => {
        splain.addTemplate("example1",["hello"]);
        splain.addTemplate("example2",["world"]);
        expect(splain.$compileGroup("{example1 example2}")).toBe("hello world");
    });

    it("Should be able to compile many splain groups", () => {
        splain.addTemplate("example1",["hello"]);
        splain.addTemplate("example2",["world"]);
        expect(splain.compile("{example1} to the {example2}")).toBe("hello to the world");
    });


});