var Splain = require('../splain.js');


describe("when using the parser", function () {
    let splain, input;
    beforeEach(()=>{
        input = "this is a {qual}{adj} test.";
        splain = new Splain();
    });

    it("should be able to find splain groups", function () {
        expect(splain.$findGroups().length).toBe(2);
    })
});