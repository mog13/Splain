import {Dictionary} from "./Dictionary";
import {Entry} from "./Entry";


describe('using the Dictionary class', ()=>{

    describe('when I want to add an entry', ()=>{

        it('should accept an object', ()=>{
             const dictionary:Dictionary = new Dictionary();
             dictionary.AddEntry({this:{is:{a:['test']}}});
             expect(dictionary.getEntries('this.is.a').length).toBe(1);
        });

        it('should be able to add entries with multiple roots', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.AddEntry({test:['it','works'],hello:['world']});
            expect(dictionary.getEntries('test')).toHaveLength(2);
            expect(dictionary.getEntries('hello')).toHaveLength(1);
        });

        it('should be able to merge new entries with old ones', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.AddEntry({colours:{blue:["turquoise"]}});
            dictionary.AddEntry({colours:{blue:["cyan"]}});
            dictionary.AddEntry({colours:{red:["maroon","scarlet"]}});
            dictionary.AddEntry({colours:{blue:["navy"]}});
            expect(dictionary.getEntries('colours.blue')).toHaveLength(3);
            expect(dictionary.getEntries('colours.red')).toHaveLength(2);
        });

        it('should be able to add Entries', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.AddEntry({hello:[new Entry('world')]});
            expect(dictionary.getEntries('hello').length).toBe(1);

        });

        it('should handle being passed an entry that doesnt exits', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.AddEntry({test:['it','works'],hello:['world']});
            expect(dictionary.getEntries('this.is.not.a.path.that.exists')).toBe(null);
        });

        it('should return all children if passed a non terminating path', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.AddEntry({colours:{blue:["turquoise","cyan","navy"]}});
            dictionary.AddEntry({colours:{red:["maroon","scarlet"]}});
            expect(dictionary.getEntries('colours')).toHaveLength(5);
        });

        it('should rebuild the dictionary when an string is added', ()=>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.AddEntry({hello:['world']});
            const entry =  dictionary.getEntries('hello')[0];
            expect(entry).toBeInstanceOf(Entry);
        });

        it('should rebuild the dictionary when an entry is added', ()=>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.AddEntry({hello:[new Entry('world',{},5)]});
            const entry =  dictionary.getEntries('hello')[0];
            expect(entry.value).toBe("world");
            expect(entry.weight).toBe(5);
        });
    })
});
