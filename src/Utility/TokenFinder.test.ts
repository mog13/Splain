import {findTokens} from './TokenFinder';
import {DefaultConfig} from "../Config";


describe('using the token finder', () => {
    describe('should work withe the default config', () => {
        RunTestsWithGivenConfig(DefaultConfig);
    });

    describe('should work with custom tokens where   RunTestsWithGivenConfig({\n' +
        '            token: {\n' +
        '                open: "^^^",\n' +
        '                close: "]"\n' +
        '            }\n' +
        '        });open and close are different lengths', () => {

        RunTestsWithGivenConfig({
            token: {
                open: "@",
                close: "$£%^&*^%$£^&%*&$^"
            }
        });
    });
});

function RunTestsWithGivenConfig(config) {
    // {{test}}
    it('should be able to find a single token', () => {
        const tokens = findTokens(`${config.token.open}test${config.token.close}`, config);
        expect(tokens.length).toBe(1);
    });

    // this {{test}} should work
    it('should be able to find a single token amongst normal text', () => {
        const tokens = findTokens(`this ${config.token.open}test${config.token.close} should work`, config);
        expect(tokens.length).toBe(1);
    });

    // {{this}} {{is}} {{a}} {{test}}
    it('should be able to return every separate token in an input', () => {
        const tokens = findTokens(`${config.token.open}this${config.token.close} ${config.token.open}is${config.token.close} ${config.token.open}a${config.token.close} ${config.token.open}test${config.token.close}`, config);
        expect(tokens.length).toBe(4);
    });

    // {{this {{is}} {{a}} test}}
    it('should return the whole token, even if it contains multiple tokens', () => {
        const tokens = findTokens(`${config.token.open}this ${config.token.open}is${config.token.close} ${config.token.open}a${config.token.close} test${config.token.close}`, config);
        expect(tokens.length).toBe(1);
    });

    // {{this {{is {{a {{test}}}}}}}}
    it('should return the whole token even if it contains nested tokens', () => {
        const tokens = findTokens(`${config.token.open}this ${config.token.open}is ${config.token.open}a ${config.token.open}test${config.token.close}${config.token.close}${config.token.close}${config.token.close}`, config);
        expect(tokens.length).toBe(1);
    });
}

