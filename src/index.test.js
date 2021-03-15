import {describe, expect, it} from "@jest/globals";

const Splain = require('./index').default;

describe("dummy test for framework setup", ()=>{
    it("should return a specific number", ()=>{
        let splain = new Splain();
        expect(splain.test()).toBe(1);
    })
})