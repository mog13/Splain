import {Dictionary} from "./Dictionary";
import {Entry} from "./Entry";


describe('using the Dictionary class', ()=>{

    describe('when I want to add an entry', ()=>{

        it('should accept an object', ()=>{
             const dictionary:Dictionary = new Dictionary();
             dictionary.addEntry({this:{is:{a:['test']}}});
             expect(dictionary.getEntries('this.is.a').length).toBe(1);
        });

        it('should be able to add entries with multiple roots', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.addEntry({test:['it','works'],hello:['world']});
            expect(dictionary.getEntries('test')).toHaveLength(2);
            expect(dictionary.getEntries('hello')).toHaveLength(1);
        });

        it('should be able to merge new entries with old ones', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.addEntry({colours:{blue:["turquoise"]}});
            dictionary.addEntry({colours:{blue:["cyan"]}});
            dictionary.addEntry({colours:{red:["maroon","scarlet"]}});
            dictionary.addEntry({colours:{blue:["navy"]}});
            expect(dictionary.getEntries('colours.blue')).toHaveLength(3);
            expect(dictionary.getEntries('colours.red')).toHaveLength(2);
        });

        it('should be able to add Entries', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.addEntry({hello:[new Entry('world')]});
            expect(dictionary.getEntries('hello').length).toBe(1);

        });

        it('should handle being passed an entry that doesnt exits', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.addEntry({test:['it','works'],hello:['world']});
            expect(dictionary.getEntries('this.is.not.a.path.that.exists')).toBe(null);
        });

        it('should return all children if passed a non terminating path', () =>{
            const dictionary:Dictionary = new Dictionary();
            dictionary.addEntry({colours:{blue:["turquoise","cyan","navy"]}});
            dictionary.addEntry({colours:{red:["maroon","scarlet"]}});
            expect(dictionary.getEntries('colours')).toHaveLength(5);
        });

        describe('when an entry is added it should rebuild the dictionary', ()=>{
            it('should convert non Entries into Entry', ()=>{
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:['world']});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry).toBeInstanceOf(Entry);
            });

            it('should rebuild the dictionary when an entry is added', ()=>{
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:[new Entry('world',{},5)]});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry.value).toBe("world");
                expect(entry.weight).toBe(5);
            });

            it('should give non token entries a computed weight of 1',()=>{
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:['world']});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry.computedWeight).toBe(1);
            });

            it('should give pure token entries a weight associated with the token', ()=> {
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:['{{planet}}','non token'],planet:['earth','world']});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry.computedWeight).toBe(2);
            });


            it('should give non pure token entries a weight associated with the token', ()=> {
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:['{{greeting {{planet}}}}','non token'],planet:['earth','world']});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry.computedWeight).toBe(2);
            });

            it('should give non pure token with multiple inner tokens a representative weighting', ()=> {
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:['{{{{greeting}} {{planet}}}}','non token'],planet:['earth','world'],greeting:['hi',"hello","howdy"]});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry.computedWeight).toBe(5);
            });

            it('should give pure token entries a weight associated with the token and do so daisy chained/recursively', ()=> {
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:['{{planet}}','non token'],planet:['{{solarSystem}}','world'],solarSystem:['earth','mars']});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry.computedWeight).toBe(3);
            });

            it('should give pure token entries a weight associated with the token and do so daisy chained/recursively (multiple uses)', ()=> {
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:['{{planet}}','non token'],planet:['{{solarSystem}}','{{places}}'],solarSystem:['earth','mars'],places:['world','people','internet']});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry.computedWeight).toBe(5);
                expect( dictionary.getEntries('planet')[0].computedWeight).toBe(1);
                expect( dictionary.getEntries('planet')[1].computedWeight).toBe(2);

            });

            it('shouldnt get trapped weighing cyclic references',()=>{
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:['{{planet}}','non token'],planet:['{{solarSystem}}'],solarSystem:['{{planet}}','earth','mars']});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry.computedWeight).toBe(3);
            });

            it( 'should be able to deal with malformed tokens', ()=>{
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({hello:['{{planet}}','non token'],planet:['{{solarSystem}}'],solarSystem:['{{planf32et}}','earth','mars']});
                const entry =  dictionary.getEntries('hello')[0];
                expect(entry.computedWeight).toBe(3);
            });

            it( 'should be able to handle multiple tokens', ()=>{
                const dictionary:Dictionary = new Dictionary();
                dictionary.addEntry({getColour:['{{descriptor}} {{colour}}','non token'],descriptor:['vibrant','dull'],colour:['red','green']});
                const entry =  dictionary.getEntries('getColour')[0];
                expect(entry.computedWeight).toBe(4);
            });

        })
    })
});
