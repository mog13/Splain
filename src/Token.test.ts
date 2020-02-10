import {Token} from "./Token";
import {DefaultConfig} from "./Config";

describe('using the Token class', ()=>{

    it('should strip out the token symbols', () =>{
        const input = "{{test}}";
        const token:Token = new Token(input,DefaultConfig);
        expect(token.raw).toBe(input);
        expect(token.value).toBe('test');
        expect(token.pure).toBe(true);
    });

    it('should strip out customised token symbols ', () =>{
        const input = "^test|}{?><";
        const token:Token = new Token(input,{token:{open:'^', close:'|}{?><'}});
        expect(token.raw).toBe(input);
        expect(token.value).toBe('test')
    });

    it('should mark tokens that dont need processing again as pure', ()=>{
        const input = "{{this {{isnt}} pure}}";
        const token:Token = new Token(input,DefaultConfig);
        expect(token.pure).toBe(false);
    })

});
