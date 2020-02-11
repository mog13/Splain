import Splain from './Splain';

describe('test', () => {

  it('should be able to work only using splain as an entry point', ()=>{
      Splain.addEntry({greeting:['hello {{planet}}'], planet:['world']});
      expect(Splain.process('{{greeting}}').value).toBe('hello world');
      expect(Splain.execute('{{greeting}}')).toBe('hello world');
  })
    it('should be able to specify to make a new dictionary', ()=>{
       Splain.addEntry({test:['hello']});
       Splain.newDictionary({test2:['world']});
        expect(Splain.execute('{{test2}}')).toBe('world');
        expect(Splain.execute('{{test}}')).toBe('{{test}}');
    });
});
