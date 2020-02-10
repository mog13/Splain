import {Processor} from "./Processor";
import {Dictionary} from "./Dictionary";
import {DefaultConfig} from "./Config";
import {Entry} from "./Entry";

describe('using the processor class', ()=>{

    describe('it should be able to process strings with vairable amounts of tokens', ()=>{
        const dictionary:Dictionary = new Dictionary();
        const processor:Processor = new Processor(dictionary);
        dictionary.addEntry({test:['hello']});

        it('should be able to process a simple string with a single token',()=>{
              expect(processor.process('{{test}}',DefaultConfig).value).toBe('hello');
        });

        it('should be able to handle complex tokens', ()=>{
            dictionary.addEntry({hello:['world']});
            expect(processor.process('{{test {{hello}}}}',DefaultConfig).value).toBe('test world');
        });

        it('should be able to process a string with no tokens',()=>{
            expect(processor.process('test',DefaultConfig).value).toBe('test');
        })

        it('should be able to process with context',()=>{
            dictionary.addEntry({colour:[new Entry('scarlet',{col:['red']}),new Entry('cyan',{col:['blue']})]});
            dictionary.addEntry({environment:[new Entry('sky',{col:['blue']})]});

            expect(processor.process('the {{colour}} {{environment}}',DefaultConfig,false,{contexts:{col:['blue']}}).value).toBe('the cyan sky');
            expect(processor.process('the {{colour}} {{environment}}',DefaultConfig,true,{contexts:{col:['red']}}).value).toBe('the scarlet {{environment}}');
        })
    });

});
