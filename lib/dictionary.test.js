import Dictionary from "./dictionary"

describe("when I'm using a dictionary", () => {
    let dictionary;
    beforeEach(() => {
        dictionary = new Dictionary();
    });

    it("should have no entries by default", () => {
        expect(Object.keys(dictionary.entries).length).toBe(0);
    });

    describe("and i add a dictionary", () => {

        describe("and i add a dictionary with a given name", () =>{
            beforeEach(()=>{
                dictionary.addEntry({testNames:["test","trial","exam"]},"test" );
            });

            it("should have one entry", () => {
                expect(Object.keys(dictionary.entries).length).toBe(1);
            });
        });

        describe("and i add a dictionary with a no name but a single root", () =>{
            beforeEach(()=>{
                dictionary.addEntry({testNames:["test","trial","exam"]});
            });

            it("should have one entry", () => {
                expect(Object.keys(dictionary.entries).length).toBe(1);
            });
        });

        describe("anbd a add a dictioanry with no name and multiple roots", () =>{
            it("should throw an error", ()=>{
                expect(()=>{dictionary.addEntry({testNames:["test","trial","exam"],test2:["test"]})}).toThrowError("JSON did not have single root property expected single root property or given name");
            });

            it("should have no entries", () => {
                try {
                    dictionary.addEntry({testNames: ["test", "trial", "exam"], test2: ["test"]});
                }
                catch(e) {}
                expect(Object.keys(dictionary.entries).length).toBe(0);
            });
        })
    })

});


