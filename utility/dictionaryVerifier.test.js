import Dictionary from "../src/dictionary";
import DictionaryVerifier from "./dictionaryVerifier";

describe("when I'm using the dictionary verifier", () => {

    let dictionary;
    beforeEach(() => {
        dictionary = new Dictionary();
    });

    it("should not return any tokens in a valid flat dictionary", () => {
        dictionary.addEntry({testNames: ["test", "exam"]});
        dictionary.addEntry({colors: ["blue", "green"]});
        expect(DictionaryVerifier.verifyEntries(dictionary).length).toBe(0);
    });

    it("should return the tokens that are invalid", ()=>{
        dictionary.addEntry({colors: ["red", "green"]});
        dictionary.addEntry({test: ["{{blue}}"]});
        expect(DictionaryVerifier.verifyEntries(dictionary).length).toBe(1);
        expect(DictionaryVerifier.verifyEntries(dictionary)[0].token).toBe("{{blue}}");
        expect(DictionaryVerifier.verifyEntries(dictionary)[0].key).toBe("test");
    });

    it("should not return any tokens in a valid multi-level dictionary", () => {
        dictionary.addEntry({a:["1"],b:{c:{d:["123"],e:["{{a}}","{{b.c.d}}"]}}});
        expect(DictionaryVerifier.verifyEntries(dictionary).length).toBe(0);
    });

    it("should return any invalid tokens in a multi-level dictionary", () => {
        dictionary.addEntry({a:["1"],b:{c:{d:["123"],e:["{{a}}","{{a..b.c.d}}"]}}});
        expect(DictionaryVerifier.verifyEntries(dictionary).length).toBe(1);
        expect(DictionaryVerifier.verifyEntries(dictionary)[0].token).toBe("{{a..b.c.d}}");
        expect(DictionaryVerifier.verifyEntries(dictionary)[0].key).toBe("b.c.e");
    });

    it("should return all invalid tokens in a multi-level dictionary", () => {
        dictionary.addEntry({a:["1"],b:{c:{d:["{{a.b}}"],e:["{{this isnt real}}","{{a..b.c.d}}"]}}});
        expect(DictionaryVerifier.verifyEntries(dictionary).length).toBe(3);
    });



});