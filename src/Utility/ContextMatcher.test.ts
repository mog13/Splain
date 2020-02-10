import { matchContexts } from "./ContextMatcher";
import { Entry } from "../Entry";


describe('using the context matcher', ()=>{


    it('should match on entries with no context', ()=>{
        expect(matchContexts(new Entry('test'),{test:['context1','context2']})).toBe(true)
    });

    it('should match when they have the same contexts', ()=>{
        expect(matchContexts(new Entry('test',{test:['context1']}),{test:['context1']})).toBe(true)
    });

    it('should match when they have at least one matching context in the same type', ()=>{
        expect(matchContexts(new Entry('test',{test:['context1']}),{test:['context1','context2']})).toBe(true)
    });

    it('should match when they have completely matching contexts', ()=>{
        expect(matchContexts(new Entry('test',{test:['context1','context2']}),{test:['context1','context2']})).toBe(true)
    });

    it('should match when they have one context type with at least one match', ()=>{
        expect(matchContexts(new Entry('test',{test:['context1']}),{test:['context1','context2'],test2:['hello','world']})).toBe(true)
    });

    it('should match when they dont have any matching context types', ()=>{
        expect(matchContexts(new Entry('test',{test:['context1']}),{test2:['hello','world']})).toBe(true)
    });

    it('shouldnt match when they have matching context types but not matching entries', ()=>{
        expect(matchContexts(new Entry('test',{test:['context1']}),{test:['context2']})).toBe(false)
    });

    it('shouldnt match when they have multipel mixed matching context types but not matching entries', ()=>{
        expect(matchContexts(new Entry('test',{test:['context1'], test2:['world']}),{test:['context2'],test2:['hello']})).toBe(false)
    });

});
