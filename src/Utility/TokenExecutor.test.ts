import {executeToken} from "./TokenExecuter";
import {Token} from "../Token";
import {Dictionary} from "../Dictionary";
import {DefaultConfig} from "../Config";
import {ProcessInfo} from "../Processor";
import {Entry} from "../Entry";


describe('using the token excecutor', () => {

    it('should be able select a token', () => {
        const token: Token = new Token('{{test}}', DefaultConfig);
        const dictionary: Dictionary = new Dictionary();
        const info: ProcessInfo = {contexts:{}, breakdown:{}};
        dictionary.AddEntry({test:['hello']});
        expect(executeToken(token, dictionary, info).value).toBe('hello');
    });

    it('should return null if no entry is found', () => {
        const token: Token = new Token('{{test}}', DefaultConfig);
        const dictionary: Dictionary = new Dictionary();
        const info: ProcessInfo = {contexts:{}, breakdown:{}};
        dictionary.AddEntry({test2:['hello']});
        expect(executeToken(token, dictionary, info)).toBe(null);
    });

    it('should respect the contexts held in process info', () => {
        const token: Token = new Token('{{greet}}', DefaultConfig);
        const dictionary: Dictionary = new Dictionary();
        const info: ProcessInfo = {contexts:{test:['match']}, breakdown:{}};
        dictionary.AddEntry({greet:[new Entry('hello',{test:['match']}),new Entry('world',{test:['dontmatch']})]});
        expect(executeToken(token, dictionary, info).value).toBe('hello');
    });

});
